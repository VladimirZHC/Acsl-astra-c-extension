
import { CompletionItemProvider } from 'vscode';
import { CompletionItem, CompletionItemKind, TextDocument, Position, CancellationToken, ProviderResult, CompletionList, CompletionContext } from 'vscode';
import * as vscode from 'vscode';

export class ACSLCompletionItemProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList> {
        // Получаем строку, в которой пользователь набирает код
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        
        // Если символ '@' отсутствует в строке, возвращаем null
        const indexOfAt = linePrefix.lastIndexOf('@');
        if (indexOfAt === -1) {
            return null;
        }
        
        // Получаем подстроку после символа '@'
        const word = linePrefix.substr(indexOfAt + 1, position.character - indexOfAt - 1);
        
        // Определяем список автодополнений
        const items: CompletionItem[] = [];
        items.push({
            label: 'requires',
            kind: CompletionItemKind.Keyword,
            documentation: 'Указывает предусловие для вызова функции',
            insertText: 'requires ',
            preselect: true
        });
        items.push({
            label: 'ensures',
            kind: CompletionItemKind.Keyword,
            documentation: 'Указывает постусловие для вызова функции',
            insertText: 'ensures ',
            preselect: true
        });
        items.push({
            label: 'assigns',
            kind: CompletionItemKind.Keyword,
            documentation: 'Указывает, какие переменные изменяются функцией',
            insertText: 'assigns ',
            preselect: true
        });
        items.push({
            label: 'behavior',
            kind: CompletionItemKind.Keyword,
            documentation: 'Описывает поведение функции',
            insertText: 'behavior ',
            preselect: true
        });

        return new CompletionList(items, true);
    }
}

export class ACSLDocumentFormattingEditProvider implements vscode.DocumentFormattingEditProvider {
    public provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TextEdit[]> {
        const edits: vscode.TextEdit[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            if (line.text.trim().startsWith('*@')) {
                const range = new vscode.Range(line.range.start, line.range.end);
                const text = `// ${line.text.trim().slice(2)}`;
                edits.push(new vscode.TextEdit(range, text));
            }
        }

        return edits;
    }
}

export class CCompletionItemProvider implements vscode.CompletionItemProvider {

    public provideCompletionItems(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        token: vscode.CancellationToken, 
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        // Get the current line of text from the document
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        
        // If the user is typing an identifier name (a variable, function, etc.)
        if (/@\w*$/.test(linePrefix)) {
            // Get the list of available C keywords for autocompletion
            const keywords = [
                'auto',
                'break',
                'case',
                'char',
                'const',
                'continue',
                'default',
                'do',
                'double',
                'else',
                'enum',
                'extern',
                'float',
                'for',
                'goto',
                'if',
                'inline',
                'int',
                'long',
                'register',
                'restrict',
                'return',
                'short',
                'signed',
                'sizeof',
                'static',
                'struct',
                'switch',
                'typedef',
                'union',
                'unsigned',
                'void',
                'volatile',
                'while'
            ];

            // Map the list of keywords to CompletionItem objects
            const completionItems = keywords.map(keyword => {
                const completionItem = new vscode.CompletionItem(keyword);
                completionItem.kind = vscode.CompletionItemKind.Keyword;
                return completionItem;
            });

            return completionItems;
        }

        return [];
    }
}