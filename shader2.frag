// must always set precision
precision mediump float;

// variables passed from application
uniform vec2 u_resolution; // [width, height]
uniform vec2 u_mouse; // [mouseX, mouseY]
uniform float u_time;

void main() {
// gl_FragCoord stores window space coordinates of the pixel
    vec2 st = u_resolution.xy / gl_FragCoord.xy;
    gl_FragColor = vec4(st.y, sin(u_time) , 0.0, 1.0);
    //gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
    //gl_FragColor = vec4(0.3, 0.7, 0.0, 1.0);
}