import { ExtensionContext } from 'vscode';
import { 
    CCompletionItemProvider, 
    ACSLDocumentFormattingEditProvider, 
    ACSLCompletionItemProvider 
    } from '../language-features/acsl';
import * as vscode from 'vscode';


export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            { scheme: 'file', language: 'c' },
            new ACSLCompletionItemProvider(),
            '@'
        ),
        
    );
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider(
            'c', new ACSLDocumentFormattingEditProvider()
        )
    );
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            'c',
            new CCompletionItemProvider()
        )
    );
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
