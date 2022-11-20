/* eslint-disable react/jsx-key */
declare const React;

import { Window } from '../../layouts';
import { useBackend, useLocalState } from '../../backend';
import { Box, Button, Flex, Input, Stack, TextArea } from '../../components';
import { Component, createRef } from 'inferno';
import { ChemiAssemblerData } from '.';

const LineNumbers = (props, context) => {
  const { data } = useBackend<ChemiAssemblerData>(context);
  const [lines, setLines] = useLocalState(context, 'lines', ['test', 'test2', 'test3', '1', '2', '3', '3']);

  return (
    <Box className="chemiassembler__linenumbers">
      <span
        className="chemiassembler__linenumbers-cursor"
        style={{
          position: 'relative',
          'margin-top': `${data.pointer * 19 - 19}px`,
        }}>
        {'>'}
      </span>
      <div className="chemiassembler__linenumbers-lines">
        {lines.map((line, index) => {
          return (
            <div className={`chemiassembler__linenumbers-line`} key={index}>
              {index + 1}
            </div>
          );
        })}
      </div>
    </Box>
  );
};

const codeTemplate = 'var 1 cool\nlbl here\nadd cool sx\nprint "The value of sx is [sx]"\njmp here';

class Code extends Component<any, any> {
  elements = [];
  activeLine = 0;

  editor = (<div className="chemiassembler__codeeditor-code">{this.elements}</div>);
  plainText = codeTemplate;

  convertStringToElements = (string: string) => {
    const { data } = useBackend<ChemiAssemblerData>(this.context);
    const { variables, registers } = data;

    type MnemonicObject = {
      name: string;
      altText: string;
    };

    const mnemonics: MnemonicObject[] = [
      {
        name: 'mov',
        altText: 'Move',
      },
      {
        name: 'add',
        altText: 'Addition',
      },
      {
        name: 'sub',
        altText: 'Subtraction',
      },
      {
        name: 'mul',
        altText: 'Multiplication',
      },
      {
        name: 'div',
        altText: 'Division',
      },
      {
        name: 'mod',
        altText: 'Modulo',
      },
      {
        name: 'lbl',
        altText: 'Label',
      },
      {
        name: 'jmp',
        altText: 'Jump',
      },
    ];

    const varArr = Object.keys(variables);
    const regArr = Object.keys(registers);

    // Convert mnemonics to <Mnemonic /> components
    // Convert variables to <Variable /> components
    // Convert numbers to <Number /> components
    // Convert comments to <Comment /> components

    // Split string into array of words
    const words = string.split(' ');

    // Create array of elements
    const elements: JSX.Element[] = [];

    // Loop through words
    for (let i = 0; i < words.length; i++) {
      // Get word
      const word = words[i];
      const mnemonic = mnemonics.find((mnemonic) => mnemonic.name === word);

      // Check if word is a mnemonic
      if (mnemonic) {
        // Push <Mnemonic /> component to elements array
        elements.push(
          <span
            title={mnemonic.altText}
            style={{
              color: '#75bcff',
              'font-weight': 'bold',
            }}>
            {word}
          </span>
        );
      } else if (word.startsWith('//')) {
        // Push <Comment /> component to elements array
        elements.push(
          <span
            style={{
              color: '#d2f1c3',
            }}>
            {word}
          </span>
        );
        // Check if comment is at the end of the line, example:  ;this is a comment
      } else if (word.startsWith(';')) {
        // Add the rest of the line to the comment
        const comment = word + ' ' + words.slice(i + 1).join(' ');

        // Delete the line from the words array
        words.splice(i, words.length - i);

        elements.push(
          <span
            style={{
              color: '#c4c4c4',
            }}>
            {comment}
          </span>
        );
      } else if (regArr.includes(word)) {
        // Push <Variable /> component to elements array
        elements.push(
          <span
            style={{
              color: 'pink',
              'text-decoration': 'underline',
            }}>
            {word}
          </span>
        );
      } else if (varArr.includes(word)) {
        // Push <Variable /> component to elements array
        elements.push(
          <span
            style={{
              color: 'yellow',
            }}>
            {word}
          </span>
        );
      } else if (Number(word)) {
        // Push <Number /> component to elements array
        elements.push(
          <span
            style={{
              color: '#a8f2ff',
            }}>
            {word}
          </span>
        );
      } else {
        // Push word to elements array
        elements.push(
          <span
            style={{
              color: 'white',
            }}>
            {word}
          </span>
        );
      }

      // Add space to elements array
      elements.push(<span>&nbsp;</span>);
    }

    // Return elements array
    return elements;
  };

  setActiveLine = (line: number) => {
    this.activeLine = line;
  };

  constructor(props, context) {
    super(props, context);
    const { act } = useBackend(this.context);

    act('compile', {
      program: this.plainText,
    });
  }

  render() {
    return (
      <div className="chemiassembler__codeeditor-code">
        {this.plainText.split('\n').map((line, index) => {
          return (
            <div
              onClick={(e) => {
                // Get letter index on div
                const target = e.target as HTMLDivElement;
                const index = target.innerText.length - target.innerText.trimStart().length;
              }}
              className="chemiassembler__codeeditor-code-line">
              {this.convertStringToElements(line)}
            </div>
          );
        })}
      </div>
    );
  }
}

export const CodeEditor = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);
  const [lines, setLines] = useLocalState(context, 'lines', []);

  return (
    <Flex className="chemiassembler__codeeditor">
      <LineNumbers />
      <Code />
    </Flex>
  );
};

/*
export const CodeEditor = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);
  const [program, setProgram] = useLocalState(context, 'program', data.raw_program || '');

  const onChange = (e) => {
    const element = e.target;
    setProgram(element.value);
  };

  return <TextArea className="chemiassembler__codeeditor" value={program} onChange={onChange} />;
};*/

/*
export const CodeEditor = (props, context) => {
  const [lineCount, setLineCount] = useLocalState(context, 'lineCount', 1);

  return (
    <Flex className="chemiassembler__codeeditor">
      <Flex.Item>
        <Flex direction="column" className="chemiassembler__codeeditor-linenumbers">
          {Array.from(Array(lineCount).keys()).map((lineNumber) => (
            <Flex.Item className="chemiassembler__codeeditor-linenumbers-line" key={lineNumber}>
              {lineNumber + 1}
            </Flex.Item>
          ))}
        </Flex>
      </Flex.Item>
      <Flex.Item
        grow
        onClick={(e) => {
          // Focus on the textarea
        }}>
        <TextArea
          className="chemiassembler__codeeditor-textarea"
          style={{
            'height': `${lineCount * 19}px`,
          }}
          onInput={(e) => {
            const lines = e.target.value.split('\n');
            setLineCount(lines.length);
          }}
        />
      </Flex.Item>
    </Flex>
  );
};*/
