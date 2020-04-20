import * as vscode from 'vscode'
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
        const output = convertFileToFolder({ path })
        await showFile(output.paths.mainFile)
      }
    )
  ]

  context.subscriptions.push(...commands)
}

export function deactivate() {}
