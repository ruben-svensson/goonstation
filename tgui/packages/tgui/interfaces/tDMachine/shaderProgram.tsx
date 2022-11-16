// Vertex shader program
export const vsSource = `
attribute vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
attribute vec4 aVertexColor;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`;

// Fragment shader program

export const fsSource = `

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

export const initShaderProgram = (gl: WebGLRenderingContext) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) return;

  // Create the shader program

  const shaderProgram = gl.createProgram();
  if (!shaderProgram) {
    throw new Error('Unable to initialize the shader program.');
  }

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
};

export const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error('Unable to create shader.');
  }

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};
