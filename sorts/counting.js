//counting_pause() / counting_resume() for pausing/resuming
//counting_reset() for resetting (please give parameters)
let counting_stop = false;
let counting_pauses = 1;
async function counting_sort_util(arr, min, max, target_canvas, delay, palette){
    let i = min,j = 0,len = arr.length,count = [];
    for (i; i <= max; i++) {
        count[i] = 0;
    }
    for (i = 0; i < len; i++) {
        count[arr[i].value] += 1;
        drawArray(target_canvas, arr, palette);
		do{
			await sleep(delay);
			if(counting_stop) return counting_stop=false;
		}while(counting_pauses > 0)
    }
    for (i = min; i <= max; i++) {
        while (count[i] > 0) {
            arr[j].value = i;
            arr[j].id=1
            if(j>0){
                arr[j-1].id=0
            }
            j++;
            count[i]--;
            drawArray(target_canvas, arr, palette);
			do{
				await sleep(delay);
				if(counting_stop) return counting_stop=false;
			}while(counting_pauses > 0)
        }
    }
    while(!counting_stop)await sleep(delay);
	return counting_stop=false;
};

function counting_sort(target_canvas, n, delay, palette){
    let target_array=[];
    for(let i = 0 ; i < n ; i++){
        target_array[i] = new Pilon(i+1);
    }
    target_array.sort(() => Math.random() - 0.5);
    
    counting_sort_util(target_array, 1, n, target_canvas, delay, palette);
}
async function counting_reset(target_canvas, n, delay, palette){
	counting_stop=true;
	while(counting_stop) await sleep(10);
	
	counting_sort(target_canvas, n, delay, palette);
}

function counting_pause(){
	counting_pauses++;
}

function counting_resume(){
	counting_pauses--;
	counting_pauses = Math.max(counting_pauses, 0);
}