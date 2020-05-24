//heap_pause() / heap_resume() for pausing/resuming
//heap_reset() for resetting (please give parameters)
let heap_stop = false;
let heap_pauses = 1;
function max_heap(input, i) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    let max = i

    if (left < arrLength && input[left].value > input[max].value) {
        max = left
    }

    if (right < arrLength && input[right].value > input[max].value)     {
        max = right
    }

    if (max != i) {
        swap(input, i, max)
        max_heap(input, max)
    }
}

function swap(input, indexA, indexB) {
    const temp = input[indexA]

    input[indexA] = input[indexB]
    input[indexB] = temp
}

async function heap_sort_util(input, target_canvas, delay, palette) {   
    arrLength = input.length

    for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1)      {
        max_heap(input, i)
        drawArray(target_canvas, input, palette);
        do{
        	await sleep(delay);
        	if(heap_stop) return heap_stop=false;
        }while(heap_pauses > 0)
      }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i)
        arrLength--
        drawArray(target_canvas, input, palette);
        do{
        	await sleep(delay);
        	if(heap_stop) return heap_stop=false;
        }while(heap_pauses > 0)
        max_heap(input, 0)
    }
}

function heap_sort(target_canvas, n, delay, palette){
	let input_array=[];
	for(let i=0;i<n;i++){
		input_array[i] = new Pilon(i+1);
	}
	input_array.sort(() => Math.random() - 0.5);
	console.log(input_array);
	return heap_sort_util(input_array, target_canvas, delay, palette);
}

async function heap_reset(target_canvas, n, delay, palette){
	heap_stop=true;
	while(heap_stop) await sleep(10);
	
	heap_sort(target_canvas, n, delay, palette);
}

function heap_pause(){
	heap_pauses++;
}

function heap_resume(){
	heap_pauses--;
	heap_pauses = Math.max(heap_pauses, 0);
}