<script lang="ts">
  import { onMount } from 'svelte';

  export let name: string;
  export let credits: number;

  let isDragging = false;
  let courseSelected = false;
  let offsetX = 0, offsetY = 0;
	let divElement: HTMLDivElement | null = null;

  onMount(() => {
    document.addEventListener('mousemove', (e) => {
      if(isDragging) {
        divElement!.style.left = `${e.x - offsetX}px`;
        divElement!.style.top = `${e.y - offsetY}px`;
      }
    })
  })

/* Bug with clicking new line when editing content: fix (no new lines) */
</script>

<div 
  bind:this={divElement}
  on:mouseup={() => { isDragging = false }}
  on:mousedown={(e) => {
    if(divElement) {
      offsetX = e.x - divElement.offsetLeft;
      offsetY = e.y - divElement.offsetTop;

      isDragging = true;
    }
  }}
  role="button" tabindex="0" 
  class={`flex flex-col items-center justify-center gap-4 border-2 border-black w-[300px] h-[150px] rounded-3xl absolute top-[200px] left-[200px] cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
>
  <button 
    on:click={() => courseSelected = !courseSelected} 
    class={`rounded-full w-[25px] h-[25px] ${courseSelected ? 'bg-green-500' : 'bg-gray-300'} absolute top-[-5px] right-[-5px] cursor-pointer`}
  ></button>
  <h1 
    contenteditable
    spellcheck={false} 
    on:input={(e) => { name = e.target.innerText; }} 
    class="text-xl"
  >{name}</h1>
  <h2 
    contenteditable
    spellcheck={false} 
    on:input={(e) => { credits = Number(e.target.innerText); }} 
    class="text-lg"
  >{credits}</h2>
</div>
