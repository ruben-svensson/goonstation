declare const React;

import { Window } from '../../layouts';
import { useBackend, useLocalState } from '../../backend';
import { Box, Button, Flex, Input, Stack, TextArea } from '../../components';
import { Component, createRef } from 'inferno';

export class CodeEditor extends Component {
  codeRef = createRef<HTMLElement>();
  elements = (

  );

  constructor(props) {
    super(props);
  }

  codeRender() {
    return <code
    ref={this.codeRef}
    className="chemiassembler__codeeditor-textarea"
    oninput={(e) => {
      e.preventDefault();
    }}
    contentEditable
  />
  }

  componentDidUpdate() {
    // Convert the contents of this.elements to elements
    // if the word is var | set | add | sub | lbl | jmp wrap it in a span
  }

  render() {
    return (
      <Box className="chemiassembler__codeeditor">
        {this.elements}
        <Box>{this.codeRef.current.textContent || ''}</Box>
      </Box>
    );
  }
}

/*
export const CodeEditor = (props, context) => {
  const [lineCount, setLineCount] = useLocalState(context, 'lineCount', 1);

  return (
    <Flex className="chemiassembler__codeeditor">
      <Flex.Item>
        <Flex direction="column" className="chemiassembler__codeeditor-linenumbers">
          {Array.from(Array(lineCount).keys()).map((lineNumber) => (
            <Flex.Item className="chemiassembler__codeeditor-linenumbers-line" key={lineNumber}>
              {' '}
              {lineNumber + 1}{' '}
            </Flex.Item>
          ))}
        </Flex>
      </Flex.Item>
      <Flex.Item grow>
        <textarea
          className="chemiassembler__codeeditor-textarea"
          tabIndex={-1}
          style={{
            'height': `${lineCount * 19}px`,
          }}
          oninput={(e) => {
            e.preventDefault();
            const target = e.target as HTMLTextAreaElement;
            const value = target.value;
            setLineCount(value.split('\n').length);
          }}
          onkeydown={(e) => {
            const target = e.target as HTMLTextAreaElement;

            const value = target.value;

            // on tab key press, insert 2 spaces
            if (e.keyCode === 9) {
              const start = target.selectionStart;
              const end = target.selectionEnd;

              target.value = value.substring(0, start) + '  ' + value.substring(end);
              target.selectionStart = target.selectionEnd = start + 2;
              e.preventDefault();
            }

            // on enter key press, copy the indentation of the previous line

          }}
        />
      </Flex.Item>
    </Flex>
  );
};*/
