<script>
    let checked = false;

    const uniqueID = Math.floor(Math.random() * 100)

    function handleClick(event){
        const target = event.target

        const state = target.getAttribute('aria-checked')

        checked = state === 'true' ? false : true
        if(checked) {
            document.body.classList.add('light-mode')
        }else {
            document.body.classList.remove('light-mode')
        }
    }
	</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->

<div class="s s--slider me-10">
    <button
        role="switch"
        aria-checked={checked}
        aria-labelledby={`switch-${uniqueID}`}
        on:click={handleClick}>
    </button>
</div>

<style>
			:root {
		--accent-color: CornflowerBlue;
		--gray: #ccc;
	}

    .s--slider {
        display: flex;
        align-items: center;
    }

    .s--slider button {
        width: 3em;
        height: 1.6em;
        position: relative;
        margin: 0 0 0 0.5em;
        background: var(--gray);
        border: none;
    }

    .s--slider button::before {
        content: '';
        position: absolute;
        width: 1.3em;
        height: 1.3em;
        background: #fff;
        top: 0.13em;
        right: 1.5em;
        transition: transform 0.3s;
    }

    .s--slider button[aria-checked='true']{
        background-color: var(--accent-color)
    }

    .s--slider button[aria-checked='true']::before{
        transform: translateX(1.3em);
        transition: transform 0.3s;
    }

    .s--slider button:focus {
        box-shadow: 0 0px 0px 1px var(--accent-color);
    }
    /* Slider Design Option */
    .s--slider button {
        border-radius: 1.5em;
    } 
    
    .s--slider button::before {
        border-radius: 100%;
    }

    .s--slider button:focus {
        box-shadow: 0 0px 8px var(--accent-color);
        border-radius: 1.5em;
    }
</style>