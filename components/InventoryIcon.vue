<template>
  <svg
    width="28px"
    height="28px"
    viewBox="0 0 28 28"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <!-- Generator: Sketch 60 (88103) - https://sketch.com -->
    <title>Rectangle</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <pattern
        id="pattern-1"
        patternUnits="objectBoundingBox"
        x="0%"
        width="100%"
        height="100%"
      >
        <use
          xlink:href="#image-2"
          transform="scale(0.186666667,0.186666667)"
        ></use>
      </pattern>
      <image
        id="image-2"
        width="150"
        height="150"
        xlink:href="data:image/png;base64,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"
      ></image>
    </defs>
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="Info-Banner"
        transform="translate(-38.000000, -609.000000)"
        fill="url(#pattern-1)"
        fill-rule="nonzero"
      >
        <g id="Bottom-Navigation" transform="translate(0.000000, 599.000000)">
          <g id="Group" transform="translate(38.000000, 10.000000)">
            <rect id="Rectangle" x="0" y="0" width="28" height="28"></rect>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>
