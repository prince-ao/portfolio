---
title: "Infinite Canvas Journey: Part 1"
nav_title: "infinite-1"
layout: "@layouts/BlogPostLayout.astro"
author: "Prince Addo"
created: "2024-01-05T18:02:58+00:00"
tags: ["infinite-canvas"]
---

## What is infinite canvas?
I found the concept(or maybe principles?) of infinite canvas while reading [a blog post](https://wattenberger.com/thoughts/evolving-the-infinite-canvas)
which linked to the [infinite canvas description page](https://infinitecanvas.tools/). It piqued my interest
mainly because it seemed like it could be applied to a project that I was starting.

Infinite canvas applications are applications that go along with the way humans
process naturally information through space. An intuitive example for me is a physical notebook;
I love writing notes in notebooks instead of a text editor because I am able to
manipulate the page in any way I want and the process of manipulating the page
feels natural. According to the description page, an infinite canvas application has
these components:
- expansiveness: a seemingly limitless canvas
- zoom: different zoom levels
- direct manipulation: keep the infinite canvas the SSOT
- collaboration: real-time collaboration

As stated earlier, I became interested in this particular concept because it applies
to a project that I'm working on. The project is essentially a desktop
application, using Tauri and Svelte, that "predicts" the next classes a student can take 
based on the previously taken and a graph of the class dependencies. I _could_
simply have a input box, which accepts the taken classes, and output box, which
shows the next classes, and process everything in the backend, but it would be
a lot more interesting, and better user experience, if the principles of infinite
canvas were used.

## Moving a node
Part of fulfilling the direct manipulation principle is making a node(a unit that could be manipulated)
movable. There are two ways to accomplish this using TypeScript(or JavaScript):
using the `left` and `top` style properties or using the `transform` property with
the `tralsate` function. In my case the `left` and `top` style property required
less code, so I went with that.

```ts
let isDragging = false;
let offsetX = 0, offsetY = 0;
let draggableNode: HTMLDivElement = ...;

draggableNode.addEventListener('mousedown', (e: MouseEvent) => {
    offsetX = e.x - draggableNode.offsetLeft; // x offset in node
    offsetY = e.y - draggableNode.offsetTop; // y offset in node

    isDragging = true;
})

draggableNode.addEventListener('mouseup', (e: MouseEvent) => {
    isDragging = false;
})

document.addEventListener('mousemove', (e: MouseEvent) => {
    if(isDragging) {
        draggableNode.style.left = `${e.x - offsetX}px`; // updated x position of node
        draggableNode.style.top = `${e.y - offsetY}px`; // updated y position of node
    }
})
```

Here I just take advantage of the `mousedown`, `mouseup`, `mousemove` events to
make the node follow the user's pointer when they're dragging a node. The offsets(`offsetX` and `offsetY`) are the position
of the pointer in the node; without those, when the user drags a node there's a sudden glitch
that moves the node so that the pointer is at the center (or whatever default value I set); this makes the experience
less smooth and realistic.
