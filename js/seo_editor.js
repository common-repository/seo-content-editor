jQuery(document).ready(function($){

$(window).load(function() {




function seoce_keywordsBadges(arr){

    arr.forEach(function(item, index){

        var color = "red";

        if(item[1]==item[2]){
            color = "green";
        }

        if(item[1]>item[2]){
            color = "red warning_icon";
        }        

        if(item[1]==0){
            color = "red";
        }  

        if((item[1]>0) && (item[1]<item[2])){
            color = "orange";
        } 


        document.getElementById('seoce_wintext').innerHTML += '<div class="seoce_badge_entry badge_entry_' + color + '" data-id="' + item[0] + ':' + item[2] + '"><span class="badge_keyword">' + item[0] + '</span><span class="badge_numbers_' + color + ' badge_numbers_first">' + item[1] + '<span>/' + item[2] + '</span></span></div>';

    });

}




function seoce_stripHtml(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}







function seoce_findKeywords(component, keywords){
    var desired = component.replace(/[^(A-zÀ-ú)\s]/gi, '').replace(/\n/gi,' ');

    var seoce_eliminarDiacriticos = function(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    }	

    var seoce_getIndicesOf = function(searchStr, str, caseSensitive) {
        var searchStrLen = searchStr.length;
        if (searchStrLen == 0) {
            return [];
        }
        var startIndex = 0, index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }


    var data = [];
    
    keywords.forEach(function(item, index){

        var indices = seoce_getIndicesOf(seoce_eliminarDiacriticos(item[0]), seoce_eliminarDiacriticos(desired));

        data.push([item[0], indices.length, item[1]]);
    });

    return data;

}



function seoce_performMark() {

    var obj = JSON.parse(document.getElementById('seo_content_editor_keywords_csv').value);

    var wordcount = seoce_stripHtml(tinyMCE.activeEditor.getContent()).trim().split(/\s+/).length;



    if(wordcount >= obj.data.words){
        document.querySelector(".seoce_sec_words").innerHTML = '<span class="dashicons dashicons-yes-alt" style="color:limegreen;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_words").innerText;
    }else if((wordcount == 0) || (wordcount < (obj.data.words/2))){
        document.querySelector(".seoce_sec_words").innerHTML = '<span class="dashicons dashicons-dismiss" style="color:red;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_words").innerText;
    }else if(wordcount > (obj.data.words/2)){
        document.querySelector(".seoce_sec_words").innerHTML = '<span class="dashicons dashicons-warning" style="color:orange;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_words").innerText;
    }

    document.querySelector(".seoce_sec_words_value1").innerText = wordcount;
    document.querySelector(".seoce_sec_words_value2").innerText = obj.data.words;


    var tempDom = $('<output>').append($.parseHTML(tinyMCE.activeEditor.getContent()));
    var imgcount = $('img', tempDom).length;



    if(imgcount >= obj.data.img){
        document.querySelector(".seoce_sec_images").innerHTML = '<span class="dashicons dashicons-yes-alt" style="color:limegreen;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_images").innerText;
    }else if((imgcount == 0) || (imgcount < (obj.data.img/2))){
        document.querySelector(".seoce_sec_images").innerHTML = '<span class="dashicons dashicons-dismiss" style="color:red;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_images").innerText;
    }else if(imgcount > (obj.data.img/2)){
        document.querySelector(".seoce_sec_images").innerHTML = '<span class="dashicons dashicons-warning" style="color:orange;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_images").innerText;
    }


    document.querySelector(".seoce_sec_images_value1").innerText = imgcount;
    document.querySelector(".seoce_sec_images_value2").innerText = obj.data.img;



    var pcount = $('p', tempDom).length;

    if(pcount >= obj.data.p){
        document.querySelector(".seoce_sec_paragraph").innerHTML = '<span class="dashicons dashicons-yes-alt" style="color:limegreen;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_paragraph").innerText;
    }else if((pcount == 0) || (pcount < (obj.data.p/2))){
        document.querySelector(".seoce_sec_paragraph").innerHTML = '<span class="dashicons dashicons-dismiss" style="color:red;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_paragraph").innerText;
    }else if(pcount > (obj.data.p/2)){
        document.querySelector(".seoce_sec_paragraph").innerHTML = '<span class="dashicons dashicons-warning" style="color:orange;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_paragraph").innerText;
    }

    document.querySelector(".seoce_sec_paragraph_value1").innerText = pcount;
    document.querySelector(".seoce_sec_paragraph_value2").innerText = obj.data.p;



    var bcount = $('b', tempDom).length + $('strong', tempDom).length;

    if(bcount >= obj.data.bold){
        document.querySelector(".seoce_sec_bold").innerHTML = '<span class="dashicons dashicons-yes-alt" style="color:limegreen;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_bold").innerText;
    }else if((bcount == 0) || (bcount < (obj.data.bold/2))){
        document.querySelector(".seoce_sec_bold").innerHTML = '<span class="dashicons dashicons-dismiss" style="color:red;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_bold").innerText;
    }else if(bcount > (obj.data.bold/2)){
        document.querySelector(".seoce_sec_bold").innerHTML = '<span class="dashicons dashicons-warning" style="color:orange;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_bold").innerText;
    }

    document.querySelector(".seoce_sec_bold_value1").innerText = bcount;
    document.querySelector(".seoce_sec_bold_value2").innerText = obj.data.bold;





    var h1count = $('h1', tempDom).length;

    if(h1count == obj.data.h1){
        document.querySelector(".seoce_sec_h1").innerHTML = '<span class="dashicons dashicons-yes-alt" style="color:limegreen;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_h1").innerText;
    }else if((h1count == 0) || (h1count < (obj.data.h1/2))){
        document.querySelector(".seoce_sec_h1").innerHTML = '<span class="dashicons dashicons-dismiss" style="color:red;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_h1").innerText;
    }else if(h1count > (obj.data.h1/2)){
        document.querySelector(".seoce_sec_h1").innerHTML = '<span class="dashicons dashicons-warning" style="color:orange;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_h1").innerText;
    }


    document.querySelector(".seoce_sec_h1_value1").innerText = h1count;
    document.querySelector(".seoce_sec_h1_value2").innerText = obj.data.h1;




    var h2count = $('h2', tempDom).length;

    if(h2count >= obj.data.h2){
        document.querySelector(".seoce_sec_h2").innerHTML = '<span class="dashicons dashicons-yes-alt" style="color:limegreen;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_h2").innerText;
    }else if((h2count == 0) || (h2count < (obj.data.h2/2))){
        document.querySelector(".seoce_sec_h2").innerHTML = '<span class="dashicons dashicons-dismiss" style="color:red;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_h2").innerText;
    }else if(h2count > (obj.data.h2/2)){
        document.querySelector(".seoce_sec_h2").innerHTML = '<span class="dashicons dashicons-warning" style="color:orange;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_h2").innerText;
    }

    document.querySelector(".seoce_sec_h2_value1").innerText = h2count;
    document.querySelector(".seoce_sec_h2_value2").innerText = obj.data.h2;




    var inlinks = 0;
    var exlinks = 0;

    $('a', tempDom).each(function(){

        if(window.location.hostname == seoce_domain_from_url($(this).attr('href'))){
            inlinks++;
        }else{
            exlinks++;
        }


    });




    if(inlinks >= obj.data.internal_links){
        document.querySelector(".seoce_sec_int_link").innerHTML = '<span class="dashicons dashicons-yes-alt" style="color:limegreen;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_int_link").innerText;
    }else if((inlinks == 0) || (inlinks < (obj.data.internal_links/2))){
        document.querySelector(".seoce_sec_int_link").innerHTML = '<span class="dashicons dashicons-dismiss" style="color:red;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_int_link").innerText;
    }else if(inlinks > (obj.data.internal_links/2)){
        document.querySelector(".seoce_sec_int_link").innerHTML = '<span class="dashicons dashicons-warning" style="color:orange;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_int_link").innerText;
    }


    document.querySelector(".seoce_sec_int_link_value1").innerText = inlinks;
    document.querySelector(".seoce_sec_int_link_value2").innerText = obj.data.internal_links;


    if(exlinks >= obj.data.external_links){
        document.querySelector(".seoce_sec_ext_link").innerHTML = '<span class="dashicons dashicons-yes-alt" style="color:limegreen;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_ext_link").innerText;
    }else if((exlinks == 0) || (exlinks < (obj.data.external_links/2))){
        document.querySelector(".seoce_sec_ext_link").innerHTML = '<span class="dashicons dashicons-dismiss" style="color:red;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_ext_link").innerText;
    }else if(exlinks > (obj.data.external_links/2)){
        document.querySelector(".seoce_sec_ext_link").innerHTML = '<span class="dashicons dashicons-warning" style="color:orange;font-size:16px;margin:auto;line-height: unset;"></span>' + document.querySelector(".seoce_sec_ext_link").innerText;
    }


    document.querySelector(".seoce_sec_ext_link_value1").innerText = exlinks;
    document.querySelector(".seoce_sec_ext_link_value2").innerText = obj.data.external_links;




    if(obj.keywords.length > 0){

        var keys = [];
        
        obj.keywords.forEach(function(entry,index){

            if(parseInt(entry[1])){
                keys.push([entry[0],parseInt(entry[1])]);
            }
            
        });

        var results = seoce_findKeywords(seoce_stripHtml(tinyMCE.activeEditor.getContent()), keys);

        document.getElementById('seoce_wintext').innerHTML = "";
        seoce_keywordsBadges(results);


    }else{
        document.getElementById('seoce_wintext').innerHTML = "";
    }

};













var timer = null;


tinyMCE.activeEditor.on('keydown', function(e) {

    var selector = $("#content_ifr").contents().find("body");
    selector.unmark();


    clearTimeout(timer); 
    timer = setTimeout(seoce_performMark, 1000)
});





document.querySelector("textarea[name='seo_content_editor_keywords_csv']").addEventListener("change", seoce_performMark);


seoce_performMark();








$(document).on('mouseout', '.seoce_badge_entry', function(event) {

    var selector = $("#content_ifr").contents().find("body");
    selector.unmark();
  
});







$(document).on('mouseover', '.seoce_badge_entry', function(event) {


        var keys = [];
        
        var entry = $(this).data( "id" ).split(":");
        if(parseInt(entry[1])){
            keys.push([entry[0],parseInt(entry[1])]);
        }
            


        var results = seoce_findKeywords(seoce_stripHtml(tinyMCE.activeEditor.getContent()), keys);

        results.forEach(function(item, index){

            var color = "red";
    
            if(item[1]==item[2]){
                color = "green";
            }
    
            if(item[1]>item[2]){
                color = "red";
            }        
    
            if(item[1]==0){
                color = "red";
            }  
    
            if((item[1]>0) && (item[1]<item[2])){
                color = "orange";
            } 
    
            var selector = $("#content_ifr").contents().find("body");
            selector.mark(item[0], {element:'span', className:'seoce_mark_' + color, separateWordSearch: false });

    
        });

    
    
});




function seoce_highlight_all(){

    var obj = JSON.parse(document.getElementById('seo_content_editor_keywords_csv').value);

    if(obj.keywords.length > 0){
        var keys = [];
        
        obj.keywords.forEach(function(entry,index){
            if(parseInt(entry[1])){
                keys.push([entry[0],parseInt(entry[1])]);
            }
        });

        var results = seoce_findKeywords(seoce_stripHtml(tinyMCE.activeEditor.getContent()), keys);

        results.forEach(function(item, index){

            var color = "red";
    
            if(item[1]==item[2]){
                color = "green";
            }
    
            if(item[1]>item[2]){
                color = "red";
            }        
    
            if(item[1]==0){
                color = "red";
            }  
    
            if((item[1]>0) && (item[1]<item[2])){
                color = "orange";
            } 
    
            var selector = $("#content_ifr").contents().find("body");
            selector.mark(item[0], {element:'span', className:'seoce_mark_' + color, separateWordSearch: false });

    
        });

    }

}



function seoce_unhighlight_all(){

    var selector = $("#content_ifr").contents().find("body");
    selector.unmark();

}




$(document).on('mouseover', 'span[id="highlight_all"]', function(event) {

    seoce_highlight_all();
    
});









$(document).on('mouseout', 'span[id="highlight_all"]', function(event) {

    seoce_unhighlight_all();
  
});




function seoce_domain_from_url(url) {
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
}


var pressed = 0;


function seoce_processKeyDown(e){
    if(pressed == 0){
        seoce_highlight_all();
        pressed = 1;
    }
}


function seoce_processKeyUp(e){
    if(pressed == 1){
        seoce_unhighlight_all();
        pressed = 0;
    }
}


$(document).on('keydown', function(event){

    switch (event.keyCode) {
      case 16:
        seoce_processKeyDown();
        break;
    }

});


$(document).on('keyup', function(event){

    switch (event.keyCode) {
      case 16:
        seoce_processKeyUp();
        break;
    }
    
});



















    });

});