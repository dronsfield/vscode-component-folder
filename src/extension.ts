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
    ),
    vscode.commands.registerCommand(
      'vscode-component-folder.createFolderInFolder',
      async (args) => {
        const path: string = args.fsPath
        const name = await vscode.window.showInputBox({
          placeHolder: 'Name (of component/folder)'
        })
        if (!name) return
        const ext = await vscode.window.showInputBox({
          placeHolder: 'File extension (eg: tsx, ts, jsx, js)'
        })
        if (!ext) return
        const output = createComponentFolder({ path, name, ext })
        await showFile(output.paths.mainFile)
      }
    )
  ]

  context.subscriptions.push(...commands)
}

export function deactivate() {}
