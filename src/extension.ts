import * as vscode from 'vscode'
import * as pathLib from 'path'
import { convertFileToFolder, createComponentFolder } from 'file-structurer'

async function showFile(path: string) {
  const doc = await vscode.workspace.openTextDocument(path)
  const editor = vscode.window.showTextDocument(doc)
  vscode.commands.executeCommand(
    'workbench.files.action.showActiveFileInExplorer'
  )
}

export function activate(context: vscode.ExtensionContext) {
  let commands = [
    vscode.commands.registerCommand(
      'vscode-component-folder.convertFileToFolder',
      async (args) => {
        const path: string = args.fsPath
        const output = convertFileToFolder({ path, deleteFile: true })
        await showFile(output.paths.mainFile)
      }
    ),
    vscode.commands.registerCommand(
      'vscode-component-folder.createFolderInFolder',
      async (args) => {
        const path: string = args.fsPath

        const config = vscode.workspace.getConfiguration('componentFolder')

        const name = await vscode.window.showInputBox({
          placeHolder: 'Name (of component/folder)'
        })
        if (!name) return
        const ext =
          config.get('fileExt') ||
          (await vscode.window.showInputBox({
            placeHolder: 'File extension (eg: tsx, ts, jsx, js)'
          }))
        if (!ext) return

        const templates = config.get('templates') as { [key: string]: string }
        const mainFile = config.get('mainFile') as string

        const wsFile = vscode.workspace.workspaceFile?.fsPath
        const wsFileFolder = wsFile && pathLib.dirname(wsFile)
        const wsFirstFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
        const templateRoot = wsFileFolder || wsFirstFolder

        if (templates) {
          Object.keys(templates).forEach((key) => {
            const templatePath = templates[key]
            if (!templatePath?.startsWith('/') && templateRoot)
              templates[key] = pathLib.join(templateRoot, templatePath)
          })
        }

        const opts = { path, name, ext } as Parameters<
          typeof createComponentFolder
        >[0]
        if (templates) opts.templates = templates
        if (mainFile) opts.mainFile = mainFile

        const output = createComponentFolder(opts)
        await showFile(output.paths.mainFile)
      }
    )
  ]

  context.subscriptions.push(...commands)
}

export function deactivate() {}
