
 $(document).ready(function(){

              $("#alert-basic").click(function(){
                  swal("提示语");
              });

              $("#alert-title").click(function(){
                  swal("提示语标题", "提示语");
              });

              $("#alert-success").click(function(){
                  swal("完成了", "提示语,", "success");
              });

              $("#alert-error").click(function(){
                  swal("Somthing Wrong!", "You clicked the button!,", "error");
              });

              $("#alert-info").click(function(){
                  swal("提示!", "提示语,", "info");
              });

              $("#alert-warning").click(function(){
                  swal("提示", "提示语,", "warning");
              });


              $("#confirm-btn-alert").click(function(){

                  swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("Your imaginary file is safe!");
                    }
                  });

              });

          });