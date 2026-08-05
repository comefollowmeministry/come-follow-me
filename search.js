document.addEventListener("DOMContentLoaded",()=>{

const searchBox=document.getElementById("searchBox");

const results=document.getElementById("results");

searchBox.addEventListener("keyup",function(){

const query=this.value.toLowerCase();

results.innerHTML="";

if(query.length<2){

results.innerHTML="<p>Type at least two letters.</p>";

return;

}

const matches=websitePages.filter(page=>

page.title.toLowerCase().includes(query)

||

page.description.toLowerCase().includes(query)

||

page.keywords.toLowerCase().includes(query)

);

if(matches.length===0){

results.innerHTML="<p>No results found.</p>";

return;

}

matches.forEach(page=>{

results.innerHTML+=`

<div class="card">

<h3>${page.title}</h3>

<p>${page.description}</p>

<a href="${page.url}" class="hero-button">

Open Page

</a>

</div>

`;

});

});

});