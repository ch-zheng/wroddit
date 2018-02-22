upvotes = document.querySelectorAll('.upvote');
downvotes = document.querySelectorAll('.downvote');

for (let i = 0; i < upvotes.length; i++) {
    upvotes[i].addEventListener('click', () => {
        fetch(location.origin + '/api/upvote/' + upvotes[i].id,  {
            method: 'POST' 
        }).then(_ => {
            //TODO: increment the counter
        })
        .catch(e => alert("Couldn't upvote!"));
    });
}

for (let i = 0; i < downvotes.length; i++) {
    downvotes[i].addEventListener('click', () => {
        fetch(location.origin + '/api/downvote/' + upvotes[i].id, {
            method: 'Post'
        }).then( _ => {
            //TODO: increment the counter
        }).catch(e => alert("Couldn't downvote!"));
    });
}
