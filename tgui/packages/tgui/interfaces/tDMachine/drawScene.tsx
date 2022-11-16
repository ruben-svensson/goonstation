// @ts-ignore
import { mat4 } from './gl-matrix-min';

interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
  };
}

const generateProgramInfo = (gl: WebGLRenderingContext, shaderProgram: WebGLProgram) => {
  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  return programInfo;
};

export const drawScene = (gl: WebGLRenderingContext, shaderProgram: WebGLProgram, deltaTime: number) => {
  const programInfo = generateProgramInfo(gl, shaderProgram);

  gl.clearColor(0, 0, 0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.width / gl.canvas.height;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  let modelViewMatrix = mat4.create();

  // Make modelViewMatrix smaller
  modelViewMatrix = mat4.scale(modelViewMatrix, modelViewMatrix, [0.5, 0.5, 0.5]);

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  const z = Math.sin(deltaTime * 10) / 3 + 0.5;

  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, z, -6.0 + z]
  ); // amount to translate

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    deltaTime * 2, // amount to rotate in radians
    [0, 1, 0]
  ); // axis to rotate around (Z)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
};
