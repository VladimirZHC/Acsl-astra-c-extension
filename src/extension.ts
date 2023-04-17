import { ExtensionContext } from 'vscode';

import * as vscode from 'vscode';
import * as os from 'os';



// The extension deactivate method is asynchronous, so we handle the disposables ourselves instead of using extensionContext.subscriptions.
const disposables: vscode.Disposable[] = [];



export async function initialize(context: vscode.ExtensionContext): Promise<void> {

    // Register DebugConfigurationProviders for "Run and Debug" play button.

    disposables.push(vscode.commands.registerTextEditorCommand("acsl-astra-c-extension.AddDebugConfiguration", async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]) => {
    }));


}

export function openRecentFiles() {
    const config = vscode.workspace.getConfiguration('acsl-astra-c-extension');
    const maxHistory = config.get<number>('maxRecentFiles') || 5;
  
    vscode.commands.executeCommand('workbench.action.openRecent');
    
    // Get the "Open Recently Used" editor
    const openEditors = vscode.window.visibleTextEditors.filter(
      editor => editor.document.uri.scheme === 'recentlyUsed'
    );
  
    // Limit the number of recently used files to `maxHistory`
    const recentFiles = openEditors.slice(0, maxHistory);
  
    // Show the quick pick menu to open the selected file
    vscode.window.showQuickPick(recentFiles.map(editor => editor.document.fileName)).then(filePath => {
      if (filePath) {
        vscode.workspace.openTextDocument(filePath).then(doc => {
          vscode.window.showTextDocument(doc);
        });
      }
    });
  }


export function activate(context: ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('acsl-astra-c-extension.openRecentFiles', () => {
        openRecentFiles();
    }));
}

