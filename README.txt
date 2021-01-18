Instruction to use the library:  
  
* folder/directory structure:  
    -if local images are used:  
        - images should be placed in `images/FlexiImages folder` in the folder containing the index.html.
        - the icons folder that comes with the library should be placed under the `images/icons` folder.
        - all the scripts should be placed in `scripts` folder in the folder containing the index.html.
        - `main`.css should be placed under the `css` folder in the folder containing the index.html.


* html code structure: 

    - main div containing all the source images should be listed in the following manner:  
        
        <!-- FOR LOCAL IMAGES --> 
        <div class="flexi-carousel">
            <img src="images/FlexiImages/boyLight.jpg">
            <img src="images/FlexiImages/confetti.jpg">
            <img src="images/FlexiImages/firework.jpg">
            <img src="images/FlexiImages/holi.jpg">
            <img src="images/FlexiImages/twotwentyone.jpg">
            <img src="images/FlexiImages/hotAir.jpg">
            <img src="images/FlexiImages/learn.jpg">
            <img src="images/FlexiImages/stadium.jpg">
            <img src="images/FlexiImages/geometry.jpg">
        </div>
            
        
        <!--FOR REMOTELY HOSTED IMAGES -->
        <div class="flexi-carousel">
            <img src="https://picsum.photos/900/360">
            <img src="https://picsum.photos/1000/360">
            <img src="https://picsum.photos/1100/360">
            <img src="https://picsum.photos/1101/360">
            <img src="https://picsum.photos/1102/360">
            <img src="https://picsum.photos/1103/360">
            <img src="https://picsum.photos/1104/360">
            <img src="https://picsum.photos/1105/360">
        </div>


    -the following javascript imports should be included ** in order ** when made sure DOM contents are fully loaded
      whether by listening to events or simply copying it to the end of the page, however it is achieved:  
        <script src="./scripts/userCustomizations.js"></script>
        <script src="./scripts/GLOBALS.js"></script>
        <script src="./scripts/initialSetup.js"></script>
        <script src="./scripts/utils.js"></script>
        <script src="./scripts/flexiImg.js"></script>
        <script src="./scripts/flexiQueue.js"></script>
        <script src="./scripts/main.js"></script>  
          
* USER CUSTOMIZATIONS:  
    - easily customizable properties are listed in the `userCustomizations.js`, the variables can be altered to achieve the desired effect.
    - additionally the size of the master coursel container which contains all the slidable images, can be currently altered only from `main.css`
        by altering the width and height properties.