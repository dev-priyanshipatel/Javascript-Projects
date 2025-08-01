
    
    let count = 0;
        let scoreX = 0;
        let scoreY = 0;

        document.getElementById("scorex").innerHTML = "0";
        document.getElementById("scorey").innerHTML = "0";

        function resetAll(){
        
             $(".cell").html("").removeClass("x-sign o-sign");
            count = 0;
            scoreX = 0;
            scoreY = 0;
            document.getElementById("scorex").innerHTML = "0";
            document.getElementById("scorey").innerHTML = "0";
            document.getElementById("turn").innerHTML = "X"
        }

        function resetGame(){
         
            $(".cell").html("").removeClass("x-sign o-sign");
            count = 0;
            document.getElementById("turn").innerHTML = "X"
        }

        function draw(){
            Swal.fire({
                title: "Match Draw",
                icon: "info",
                draggable: true,
                heightAuto: false,
            });
            resetGame();
        }

        function score(sign){
        Swal.fire({
            title: `Player ${sign} Won`,
            icon: "success",
            draggable: true,
            heightAuto: false,
        });
    
        if(sign === "X") {
            scoreX++;
            document.getElementById("scorex").innerHTML = scoreX;
            
        } else {
            scoreY++;
            document.getElementById("scorey").innerHTML = scoreY;
        }
        resetGame();
}


        function checkWin(sign){
            let flag = true;

            // first row
            for(let i = 1; i <= 3; i++){
                let value = document.getElementById(`b${i}`).innerHTML;

                if(value != sign){
                    flag = false;
                    break;
                }
            }

            if(flag){
                score(sign);
                return true;
            }

            // checking 2st row
            flag = true;
            for(let i = 4; i <= 6; i++){
                let value = document.getElementById(`b${i}`).innerHTML;

                if(value != sign){
                flag = false;
                break;
                }
            } 

            if(flag){
                score(sign);
                return true;
            }

        // checking 3st row
        flag = true;
        for(let i = 7; i <= 9; i++){
            let value = document.getElementById(`b${i}`).innerHTML;

            if(value != sign){
                flag = false;
                break;
            }
        } 

        if(flag){
            score(sign);
            return true;
        }

        // checking 1st col
        flag = true;
        for(let i = 1; i <= 7; i+=3){
            let value = document.getElementById(`b${i}`).innerHTML;

            if(value != sign){
                flag = false;
                break;
            }
        } 

        if(flag){
            score(sign);
            return true;
        }

        // checking 2st col
        flag = true;
        for(let i = 2; i <= 8; i+=3){
            let value = document.getElementById(`b${i}`).innerHTML;

            if(value != sign){
                flag = false;
                break;
            }
        } 

        if(flag){
            score(sign);
            return true;
        }

        // checking 3st col
        flag = true;
        for(let i = 3; i <= 9; i+=3){
            let value = document.getElementById(`b${i}`).innerHTML;

            if(value != sign){
                flag = false;
                break;
            }
        } 

        if(flag){
            score(sign);
            return true;
        }

        // checking Diagonal
        flag = true;
        for(let i = 1; i <= 9; i+=4){
            let value = document.getElementById(`b${i}`).innerHTML;

            if(value != sign){
                flag = false;
                break;
            }
        } 

        if(flag){
            score(sign);
            return true;
        }

        // checking Diagonal
        flag = true;
        for(let i = 3; i <= 7; i+=2){
            let value = document.getElementById(`b${i}`).innerHTML;

            if(value != sign){
                flag = false;
                break;
            }
        } 

        if(flag){
            score(sign);
            return true;
        }

        return false;
    }

        $(document).ready(function() {
            $(".cell").on("click", function() {

                let value = this;

                if(value.innerHTML != ""){
                    Swal.fire({
                    toast: true,
                    position: 'center',
                    icon: 'warning',
                    title: 'Cell already filled',
                    showConfirmButton: false,
                    timer: 1000,
                    heightAuto: false
                });
                }else{
                
                    if(count % 2 == 0){
                        $(value).addClass("x-sign").text("X");
                        document.getElementById("turn").innerHTML = "O"
                    }else{
                        $(value).addClass("o-sign").text("O");
                         document.getElementById("turn").innerHTML = "X"
                    }
                    count++;
                }

                let symbol = value.innerHTML;

                if(count >= 5){
                    let win = checkWin(symbol);

                    if(count == 9 && !win){
                        draw();
                    }
                }
            })

            $("#reset-btn").on("click", function(){
                resetAll();
                })
        })