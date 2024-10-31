<?php

/*
Plugin Name: SEO Content Editor
Description: Add SEO options to classic editor for redactor
Author: EktorCaba
Version: 1.0
Author URI: https://www.buymeacoffee.com/OFqRz9y
*/



function seoce_my_display_callback( $post )
{
	$values = get_post_custom( $post->ID );

	// We'll use this nonce field later on when saving.  
    wp_nonce_field( 'seo_content_editor_keywords_csv_meta', 'seo_content_editor_keywords_csv_nonce' );
    
    $text = isset( $values['seo_content_editor_keywords_csv'] ) ? esc_attr( $values['seo_content_editor_keywords_csv'][0] ) : "";

    echo '<h3><span class="dashicons dashicons-text-page"></span> '.__('STRUCTURE').'</h3>';

    

    echo '<div class="seoce-flex-container">
    <div><h4 class="seoce_sec_words">'.__('WORDS').'</h4><p><strong class="seoce_sec_words_value1">0</strong>/<span class="seoce_sec_words_value2">0</span></p></div>
    <div><h4 class="seoce_sec_images">'.__('IMAGES').'</h4><p><strong class="seoce_sec_images_value1">0</strong>/<span class="seoce_sec_images_value2">0</span></p></div>
    <div><h4 class="seoce_sec_paragraph">'.__('PARAGRAPH').'</h4><p><strong class="seoce_sec_paragraph_value1">0</strong>/<span class="seoce_sec_paragraph_value2">0</span></p></div>
    <div><h4 class="seoce_sec_bold">'.__('BOLD').'</h4><p><strong class="seoce_sec_bold_value1">0</strong>/<span class="seoce_sec_bold_value2">0</span></p></div>
    <div><h4 class="seoce_sec_h1">'.__('H1').'</h4><p><strong class="seoce_sec_h1_value1">0</strong>/<span class="seoce_sec_h1_value2">0</span></p></div>
    <div><h4 class="seoce_sec_h2">'.__('H2').'</h4><p><strong class="seoce_sec_h2_value1">0</strong>/<span class="seoce_sec_h2_value2">0</span></p></div>
    <div><h4 class="seoce_sec_int_link">'.__('INT. LINK').'</h4><p><strong class="seoce_sec_int_link_value1">0</strong>/<span class="seoce_sec_int_link_value2">0</span></p></div>
    <div><h4 class="seoce_sec_ext_link">'.__('EXT. LINK').'</h4><p><strong class="seoce_sec_ext_link_value1">0</strong>/<span class="seoce_sec_ext_link_value2">0</span></p></div>
    </div>';


    
    echo '<h3><span class="dashicons dashicons-tag"></span> '.__('KEYWORDS').'</h3>';
    echo '<div id="seoce_wintext"></div>';
    echo '<h3><span class="dashicons dashicons-admin-generic"></span> '.__('SETTINGS').'</h3>';
    echo '<p><a href="options-general.php?page=seoce-generator">'.__('Generate Post Data').'</a></p>';

    echo '<textarea rows="4" style="position: relative;display:block;width:100%;" name="seo_content_editor_keywords_csv" id="seo_content_editor_keywords_csv">'.$text.'</textarea>';
    echo '<p><span class="button button-default button-large" name="highlight_all" id="highlight_all">'.__('Highlight all').'</span></p>';

          
}



function seoce_save_meta_boxes( $post_id )  
{  
    // Bail if we're doing an auto save  
    if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return; 
 
    // if our nonce isn't there, or we can't verify it, bail 
    if( !isset( $_POST['seo_content_editor_keywords_csv_nonce'] ) || !wp_verify_nonce( $_POST['seo_content_editor_keywords_csv_nonce'], 'seo_content_editor_keywords_csv_meta' ) ) return; 
 
    // if our current user can't edit this post, bail  
    if( !current_user_can( 'edit_post' ) ) return;  

 
    // Make sure your data is set before trying to save it  
    if( isset( $_POST['seo_content_editor_keywords_csv'] ) )  
        update_post_meta( $post_id, 'seo_content_editor_keywords_csv', sanitize_text_field($_POST['seo_content_editor_keywords_csv']));  

 
}





function seoce_register_meta_boxes() {
    add_meta_box( 'seo-content-editor-meta', __( 'SEO Content Editor', 'seo-content-editor' ), 'seoce_my_display_callback', [] );
}

add_action( 'add_meta_boxes', 'seoce_register_meta_boxes' );
add_action( 'save_post', 'seoce_save_meta_boxes' );





add_action('admin_print_styles-post.php', 'seoce_custom_css_style', 11);
add_action('admin_print_styles-post-new.php', 'seoce_custom_css_style', 11);



function seoce_custom_css_style() {
    $plugin_url = plugin_dir_url( __FILE__ );
    wp_enqueue_style('seo-content-editor-meta', $plugin_url . 'css/seo_editor_style.css');

}



add_action( 'admin_print_scripts-post-new.php', 'seoce_custom_js_script', 11 );
add_action( 'admin_print_scripts-post.php', 'seoce_custom_js_script', 11 );

function seoce_custom_js_script() {
    $plugin_url = plugin_dir_url( __FILE__ );
    wp_enqueue_script('markjs', $plugin_url . 'js/lib/markjs/jquery.mark.min.js', array('jquery'), null, true);
    wp_enqueue_script('seo_editor', $plugin_url . 'js/seo_editor.js', array(  'editor','markjs'), null, true);

}








function seoce_filter_tiny_mce_before_init( $mceinit, $editor_id ) { 
    $plugin_url = plugin_dir_url( __FILE__ );

    $mceinit['content_css'] .=  ','.$plugin_url . 'css/fix_seo_editor_style.css';

    return $mceinit; 
}; 
         


add_filter( 'teeny_mce_before_init', 'seoce_filter_tiny_mce_before_init', 10, 2 );
add_filter( 'tiny_mce_before_init', 'seoce_filter_tiny_mce_before_init', 10, 2 ); 







function seoce_plugin_settings_link($links) { 
    $settings_link = '<a href="options-general.php?page=seoce-generator">'.__('Generate Post Data').'</a>'; 
    array_unshift($links, $settings_link); 
    return $links; 
  }
  $plugin = plugin_basename(__FILE__); 
  add_filter("plugin_action_links_$plugin", 'seoce_plugin_settings_link' );












/** Step 2 (from text above). */
add_action( 'admin_menu', 'seoce_gen_plugin_menu' );

/** Step 1. */
function seoce_gen_plugin_menu() {
	add_options_page( 'SEO Content Editor Generator', 'SEO CE Generator', 'manage_options', 'seoce-generator', 'seoce_gen_plugin_options' );
}

/** Step 3. */
function seoce_gen_plugin_options() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	echo '<div class="wrap">';


        echo '<h1>Generate your own JSON based in your data.</h1>';

        echo'<form id="seoceForm" name="seoceForm" method="post" action="" novalidate="novalidate">';

        
        echo'<input type="hidden" name="option_page" value="seoce-generator">
        <table class="form-table" role="presentation"><tbody>';

        echo'<tr>
        <th scope="row"><label for="words">'.__('Number of words').'</label></th>
        <td><input id="words" name="words" type="number" value="0" class="regular-text"></td>
        </tr>';


        echo'<tr>
        <th scope="row"><label for="h1">'.__('Number of H1').'</label></th>
        <td><input id="h1" name="h1" type="number" value="0" class="regular-text"></td>
        </tr>';

        echo'<tr>
        <th scope="row"><label for="h2">'.__('Number of H2').'</label></th>
        <td><input id="h2" name="h2" type="number" value="0" class="regular-text"></td>
        </tr>';

        echo'<tr>
        <th scope="row"><label for="p">'.__('Number of paragraphs').'</label></th>
        <td><input id="p" name="p" type="number" value="0" class="regular-text"></td>
        </tr>';


        echo'<tr>
        <th scope="row"><label for="b">'.__('Number of bold words').'</label></th>
        <td><input id="b" name="b" type="number" value="0" class="regular-text"></td>
        </tr>';

        echo'<tr>
        <th scope="row"><label for="images">'.__('Number of images').'</label></th>
        <td><input id="images" name="images" type="number" value="0" class="regular-text"></td>
        </tr>';

        echo'<tr>
        <th scope="row"><label for="intlink">'.__('Number of internal links').'</label></th>
        <td><input id="intlink" name="intlink" type="number" value="0" class="regular-text"></td>
        </tr>';


        echo'<tr>
        <th scope="row"><label for="extlink">'.__('Number of external links').'</label></th>
        <td><input id="extlink" name="extlink" type="number" value="0" class="regular-text"></td>
        </tr>';




        echo'<tr>
        <th scope="row"><label for="keywords">'.__('Keywords').'</label></th>
        <td><input id="keywords" name="keywords" type="text" value="" autocomplete="off" class="regular-text">
        <p class="description" id="new-admin-keywords-description">'.__('Example: <strong>wine:3,food:5,recipe:8</strong> (wine:3 represent number of times will your editor write the word wine)').'</p>
        </td>
        </tr>';




        echo '</tbody></table>';

        echo '<p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="'.__('Generate JSON').'"></p>';


        echo'</form>';


        echo '<div id="generated"></div>';

    echo '</div>';


?>



<script>



jQuery(document).ready(function ($) {


  $('#seoceForm').submit(function(e) {
    e.preventDefault();


    var fullkeywords = $(this).find('#keywords').val().split(",");
  
    var keywords = [];

    if((fullkeywords.length > 0 ) && (fullkeywords[0] != "")){

        fullkeywords.forEach(function(item, index){

          var temp = item.split(":");
          var quantity = 1;
          if(temp[1] != null){
            quantity = parseInt(temp[1]);
          }
          

          keywords.push([temp[0].trim(),quantity]);


        });

    }

    var formData = {"data":{ "words":parseInt($(this).find('#words').val()), "p":parseInt($(this).find('#p').val()), "h1":parseInt($(this).find('#h1').val()), "h2":parseInt($(this).find('#h2').val()), "bold":parseInt($(this).find('#b').val()), "img":parseInt($(this).find('#images').val()), "internal_links":parseInt($(this).find('#intlink').val()), "external_links":parseInt($(this).find('#extlink').val())}, "keywords":keywords};


    $("#generated").html('<table class="form-table" role="presentation"><tbody><tr><th scope="row">&nbsp;</th><td><textarea onclick="this.select()" class="regular-text" rows="5">' + JSON.stringify(formData) + '</textarea><p class="description">Copy all content of the box and paste into the posts where you have installed the plugin.</p></td></tr></tbody></table>');


});


});

  
  </script>




<?php


}