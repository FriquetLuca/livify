#!/usr/bin/env node
import { Command } from 'commander';
import {
  secludify
} from "./secludify";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { type EmojiRecord } from 'mkimp';
import { removeExt } from './utils/removeExt';
import { generateMarkdownFile } from './markdown/buildFiles';
import { directoryAllContent } from './secludify/fs';
import { getIP } from './utils/getIP';

const seekPath = (p: string) => {
  if(p === ".") {
    return process.cwd();
  }
  const isLocal = p.startsWith("./");
  return !isLocal ? p : path.join(process.cwd(), p);
};
const rowCurrentPackage = fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8");
const currentPackage = JSON.parse(rowCurrentPackage) as { name: string; version: string; };
const program = new Command();
program.name(currentPackage.name).description('A CLI tool for static website using MkImp.').version(currentPackage.version);

program
  .command('build')
  .description('Transpile the specified markdown or a directory where all your markdowns are located.')
  .argument('<input>', 'The current directory or file to transpile')
  .option('-r, --root <dir>', 'The source directory root where ressources are located. (Default to current working directory)')
  .option('-o, --output <output>', 'The output path for the generated HTML file(s).')
  .option('-e, --emojis <emojiPath>', 'The path to the json containing the emojis.')
  .option('-t, --template <templatePath>', 'The path to the template to use for rendered pages.')
  .option('--full', 'If the input is a directory, all the non transpiled content will be copied into the output.')
  .option('--override', 'The output path for the generated HTML file(s) can be overridden.')
  .option('--sanitize', 'Sanitize the HTML output for the HTML content.')
  .option('--disableIndexing', 'Disable the creation of default indexes on directories when no index.md is found.')
  .action(async (arg: string, rawOptions) => {
    const serveSchema = z.object({
      root: z.string().optional(),
      output: z.string().optional(),
      emojis: z.string().optional(),
      template: z.string().optional(),
      override: z.coerce.boolean().optional().default(false),
      sanitize: z.coerce.boolean().optional().default(false),
      disableIndexing: z.coerce.boolean().optional().default(false),
      full: z.coerce.boolean().optional().default(false),
    });
    const options = {
      input: seekPath(arg),
      ...serveSchema.parse(rawOptions),
    };
    if(!fs.existsSync(options.input)) {
      throw new Error("The input location does not exist.");
    }
    const output = seekPath(options.output ?? removeExt(options.input));
    const defaultTemplateLocation = options.template ? seekPath(options.template) : path.join(__dirname, "../templates/default_template.html");
    if(!fs.existsSync(defaultTemplateLocation)) {
      throw new Error("The template location does not exist.");
    }
    const emojiPath = options.emojis ? seekPath(options.emojis) : path.join(__dirname, "../defaults/emojis.json");
    const emojis = JSON.parse(fs.readFileSync(emojiPath, 'utf-8')) as Record<string, EmojiRecord>;

    const inputStats = fs.statSync(options.input);
    const isFile = inputStats.isFile() ? true : inputStats.isDirectory() ? false : null;
    if(isFile === null) throw new Error("Unknown input location type.");

    const allContent = isFile || path.extname(output) === ".html"
      ? [options.input]
      : directoryAllContent(options.input);
    
    let root = options.root;
    if(root === undefined) {
      if(options.input.startsWith("./")) {
        root = path.join(process.cwd(), options.input);
      } else if(isFile) {
        root = process.cwd();
      } else {
        root = options.input;
      }
    } else if(root.startsWith("./")) {
      root = path.join(process.cwd(), root);
    } else if(root === ".") {
      root = process.cwd();
    }

    if(fs.existsSync(output)) {
      if(!options.override) {
        throw new Error("The output location already exist.");
      }
      if(fs.statSync(output).isFile()) {
        fs.rmSync(output);
      } else {
        fs.rmSync(output, { recursive: true });
      }
    }

    for(const item of allContent) {
      await generateMarkdownFile({
        emojis,
        template: defaultTemplateLocation,
        input: item,
        sanitize: options.sanitize,
        root,
        disableIndexing: options.disableIndexing,
        override: options.override,
        output: output,
        full: options.full,
      })
    }
    
    if(isFile) {
      console.log("The file has been successfuly transpiled.");
    } else {
      console.log("The directory has been fully generated.");
    }
  });

program
  .command('serve')
  .description('Serve the directory over the network.')
  .argument('<path>', 'The current path to serve relative to the current working directory.')
  .option('-h, --host [hostname]', 'The hostname where the directory will be served.')
  .option('-p, --port [port]', 'The port where the directory will be served.')
  .option('-r, --hot', 'Allow hot reload when the directory has changed.')
  .option('-e, --emojis <emojiPath>', 'The path to the json containing the emojis.')
  .option('-t, --template <templatePath>', 'The path to the template to use for rendered pages.')
  .option('--sanitize', 'Sanitize the HTML output for the HTML content.')
  .action(async (arg: string, rawOptions: Partial<Record<"host"|"port"|"hot"|"template", string>>) => {
    const serveSchema = z.object({
      host: z.string().optional(),
      port: z.coerce.number().optional().default(3000),
      hot: z.coerce.boolean().optional().default(false),
      template: z.string().optional(),
      emojis: z.string().optional(),
      sanitize: z.coerce.boolean().optional().default(false),
    });
    const options = serveSchema.parse(rawOptions);
    if(!options.host) {
      console.log("Potential hosts:", getIP('IPv4').map((h) => `http://${h}:${options.port}`).join(", "));
    }
    const location = seekPath(arg);
    if(!fs.existsSync(location)) {
      throw new Error("The path does not exist.");
    }
    const defaultTemplateLocation = options.template ? seekPath(options.template) : path.join(__dirname, "../templates/default_template.html");
    if(!fs.existsSync(defaultTemplateLocation)) {
      throw new Error("The template location does not exist.");
    }
    const emojiPath = options.emojis ? seekPath(options.emojis) : path.join(__dirname, "../defaults/emojis.json");
    const emojis = JSON.parse(fs.readFileSync(emojiPath, 'utf-8')) as Record<string, EmojiRecord>;
    const server = await secludify({});
    if(options.hot) {
      server.socketLiveWatch({
        location,
        templateLocation: defaultTemplateLocation,
      });
    }
    server.staticFiles({
      location: path.join(__dirname, '../assets'),
      prefix: '/_internal'
    });
    server.dynamicFiles({
      location: path.join(__dirname, "../doc"),
      templateLocation: path.join(__dirname, "../templates/default_template.html"),
      emojis: JSON.parse(fs.readFileSync(path.join(__dirname, "../defaults/emojis.json"), 'utf-8')),
      sanitize: false,
      prefix: "/_internaldoc"
    });
    server.dynamicFiles({
      location,
      templateLocation: defaultTemplateLocation,
      emojis,
      sanitize: options.sanitize,
    });
    server.start({ host: options.host??"0.0.0.0", port: options.port });
  });

program.parse(process.argv);
