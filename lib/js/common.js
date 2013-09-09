   
    $eaae_themejQ=jQuery.noConflict();
        
    function eaae_theme_ajax(requests,appendto,loading) 
    {
    	$eaae_themejQ.ajax({
    		url: "admin-ajax.php",
    		type: "POST",
    		dataType: "html",
    		data: "action=eaae_theme_ajax&_ajax_nonce="+eaae_theme_nonce+"&"+requests+"",
    		success: function(response){$eaae_themejQ("#"+appendto+"").html(response);}
    	});
        
        if(loading) {
            eaae_theme_loading(appendto);
        }
    	
    }
    
    function eaae_theme_loading(appendto) 
    {
    	$eaae_themejQ("#"+appendto+"").empty();
        $eaae_themejQ("#"+appendto+"").show();
    	$eaae_themejQ("#"+appendto+"").append('<p style="padding:4px; margin:4px;"><img src="images/loading.gif" align="absmiddle"> <span style="font-size:11px; color: #999;">Loading, please wait...</span></p>');
    }
    
    
    function eaae_theme_form(requests,formname,appendto,loading) 
    {
    	$eaae_themejQ.ajax({
    		url: "admin-ajax.php?action=eaae_theme_ajax&_ajax_nonce="+eaae_theme_nonce+"&act="+requests+"",
    		type: "POST",
    		dataType: "html",
    		data: $eaae_themejQ("#"+formname+"").serialize(),
    		success: function(response){$eaae_themejQ("#"+appendto+"").html(response);}
    	});
        
        if(loading) {
            eaae_theme_loading(appendto);
        }
    	return false;
    }
    
    function eaae_theme_savechanges(requests,formname,appendto) 
    {
    	$eaae_themejQ.ajax({
            url: "admin-ajax.php?action=eaae_theme_ajax&_ajax_nonce="+eaae_theme_nonce+"&act="+requests+"",
    		type: "POST",
    		dataType: "html",
    		data: $eaae_themejQ("#"+formname+"").serialize(),
    		success: function(response){
    		    $eaae_themejQ("#"+appendto+"").empty();
                $eaae_themejQ("#"+appendto+"").show();
                $eaae_themejQ("#"+appendto+"").html(response);
                $eaae_themejQ("#"+appendto+"").fadeIn(5000);
                $eaae_themejQ("#"+appendto+"").fadeOut(1000);
              }
    	});
        $eaae_themejQ("#"+appendto+"").empty();
        $eaae_themejQ("#"+appendto+"").show();
	    $eaae_themejQ("#"+appendto+"").append('<img src="images/loading.gif" align="absmiddle"> <span style="font-size:11px; color: #999;">Saving changes, please wait...</span>');
        return false;
    }
        
    function eaae_theme_showHide(id)
    {
    	if ($eaae_themejQ("#"+id+"").is(":hidden")) {
            $eaae_themejQ("#"+id+"").slideDown('fast');
          } else {
        	  $eaae_themejQ("#"+id+"").slideUp('fast');
          }
    }
    
    function eaae_theme_hide(id) 
    {
    	$eaae_themejQ("#"+id+"").empty();
    }
    
    function eaae_theme_remove(id) 
    {
    	$eaae_themejQ("#"+id+"").remove();
    }
    
    function eaae_theme_hoverShow(id) 
    {
    	$eaae_themejQ("#"+id+"").css("display","inline");
    }
    
    function eaae_theme_hoverHide(id) 
    {
    	$eaae_themejQ("#"+id+"").css("display","none");
    } 
    
    function eaae_theme_togle(id)
    {
        $eaae_themejQ('#'+id).slideToggle('fast');
    }
    
    var eaae_theme_sp_id_new = Math.floor(Math.random()*100000);
    function eaae_theme_sp_new(id)
    {
        eaae_theme_sp_id_new = eaae_theme_sp_id_new+1;
        var new_sp_id = eaae_theme_sp_id_new;
        var get_new_sp_container = $eaae_themejQ('#eaae_theme_sp_new_'+id+'').html();
        get_new_sp_container = get_new_sp_container.replace(/the__id__/g, ''+id+new_sp_id+'');
        get_new_sp_container = get_new_sp_container.replace(/new__id__/g, ''+new_sp_id+'');
        var new_sp_container = get_new_sp_container.replace(/name_replace_/g, '');
        $eaae_themejQ('#eaae_theme_sp_new_'+id).before(new_sp_container);
    }

    function eaae_theme_sp_titles(this_id, temp_id)
    {
       var id = this_id+temp_id;
       var new_title = $eaae_themejQ('#sp_title_text_'+id).val();
	   $eaae_themejQ('#sp_title_'+id).text(new_title);
    }

    function eaae_theme_sp_delete(id)
    {
        $eaae_themejQ('#sp_container_'+id+'').remove();
    }
 	
    jQuery(document).ready(function($){
        
        // Navigation Tabs
        $(".tt-menu li").click(function () {
        	$(".tt-menu-active").removeClass("tt-menu-active");
        	$(this).addClass("tt-menu-active");
        	$(".tt-menu-content").hide();
        	var change_content= $(this).attr("id");
        	$("."+change_content).fadeIn();
           
        });
        
        // Image Upload
         $('.tt_imageupload').each(function(){
			
			var clickedObject = $(this);
            var clickedID = $(this).attr('id');
			var getClickedID = clickedID.replace("eaae_theme_image_upload_", "");
            	
			new AjaxUpload(clickedID, {
			  action: 'admin-ajax.php?action=eaae_theme_ajax&_ajax_nonce='+eaae_theme_nonce+'&act=imageupload',
			  name: clickedID,
			  data: { 
				imgname: clickedID
                },
                
			  onChange: function(file, extension){},
              
			  onSubmit: function(file, extension){
					clickedObject.text('Uploading'); 
					this.disable(); 
					interval = window.setInterval(function(){
						var text = clickedObject.text();
						if (text.length < 13){	clickedObject.text(text + '.'); }
						else { clickedObject.text('Uploading'); } 
					}, 200);
			  },
              
			  onComplete: function(file, response) {
			   if(response.search('Upload Error') > -1){
			            window.clearInterval(interval);
    				    clickedObject.text('Upload Now');
                        this.enable(); 
			            $('#'+getClickedID+'_error').text(response);
						$('#'+getClickedID+'_error').show();
					
				} else{
    				window.clearInterval(interval);
    				clickedObject.text('Upload Now');	
    				this.enable(); 
                    $('#'+getClickedID+'_error').hide();
    				$('.'+clickedID+'').val(response);	
    				$('#'+getClickedID+'_reset').show();
                    var previewImage = '<a href="'+response+'" target="_blank"><img src="'+response+'" title="The image might be resized, click for full preview!" alt="" /></a><br /><span>The image might be resized, click for full preview!</span>';
                    $('#'+getClickedID+'_preview').html(previewImage);
                    $('#'+getClickedID+'_preview').show();
                } 
              }
              
			});
		});
        
        // Reset the image filed
        $('.tt_imageupload_reset').click(function(){
			
			var clickedObject = $(this);
			var clickedID = $(this).attr('id');
			var theID = $(this).attr('title');	

			$('.eaae_theme_image_upload_'+theID+'').val('');	
			$('#'+clickedID+'').hide();
            $('#'+theID+'_preview').hide();
			return false; 
			
		}); 
        $('#tt-menuwrap ul').hide();
        $('.tt-first-menu').slideDown();
        
    });	 	
    