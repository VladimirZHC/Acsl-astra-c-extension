var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as vscode from 'vscode';
// The extension deactivate method is asynchronous, so we handle the disposables ourselves instead of using extensionContext.subscriptions.
const disposables = [];
export function initialize(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Register DebugConfigurationProviders for "Run and Debug" play button.
        disposables.push(vscode.commands.registerTextEditorCommand("acsl-astra-c-extension.AddDebugConfiguration", (textEditor, edit, ...args) => __awaiter(this, void 0, void 0, function* () {
        })));
    });
}
export function openRecentFiles() {
    const config = vscode.workspace.getConfiguration('acsl-astra-c-extension');
    const maxHistory = config.get('maxRecentFiles') || 5;
    vscode.commands.executeCommand('workbench.action.openRecent');
    // Get the "Open Recently Used" editor
    const openEditors = vscode.window.visibleTextEditors.filter(editor => editor.document.uri.scheme === 'recentlyUsed');
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
export function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('acsl-astra-c-extension.openRecentFiles', () => {
        openRecentFiles();
    }));
}
