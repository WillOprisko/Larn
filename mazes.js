"use strict";

var USED_MAZES = [];

function createRandomMaze(depth) {
  var randomMaze = 0;

  if (depth != 0) {
    do {
      randomMaze = rnd(MAZES.length - 1) + 1;
      debug("maze: " + USED_MAZES);
    } while (USED_MAZES.indexOf(randomMaze) > -1);
  }
  USED_MAZES.push(randomMaze);

  var grid = initGrid();

  // TODO: pretty sure there is a more efficient way to do this
  for (var y = 0; y < MAXY; y++) {
    for (var x = 0; x < MAXX; x++) {
      var pt = MAXX * y + x;
      grid[x][y] = MAZES[randomMaze][pt];
      //debug(x + "," + y + ": " + (pt) + ": " + MAZES[pt]);
      //this.grid[x][y] = ".";

    } // inner for
  } // outer for
  return grid;
}; // getRandomMaze

function initGrid() {
  // initialize the grid[][] Array
  var grid = new Array(MAXX);
  for (var x = 0; x < MAXX; x++) {
    grid[x] = new Array(MAXY);
  }
  // // initialize each element in the array
  // for (var x = 0 ; x < MAXX ; x++) {
  //   for (var y = 0 ; y < MAXY ; y++) {
  //      grid[x][y] = "";
  //   } // inner for
  // } // outer for
  return grid;
}



const MAZES = [
  "\
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
                                                                   \
",
  "\
###################################################################\
#           #  .        #                 #     #     #     #   . #\
#           D           D  .                       .        D .   #\
###D##########################################  #     #     ###D###\
#          -#                 #.    #      # ################ .  .#\
#     ####### ######## ############ D #### #                #     #\
# ... #.#   # #  # . # #            # #### # ############ # ###D###\
#     #.# # # ## #   # # ############ #### # #-  #      # # #.    #\
#  .  # # # # ## #-  # # #    -     D #### # # . D    # #.# # ... #\
#     # #.# #    #   # # #   . .    # #    # #   #    # #-# # ~.! #\
###D### ### #######D## # ############ ###### ########## ### #######\
#                    #  @          .#        #     .....       ...#\
###D###########################################################D###\
#  .  #.....#     #     #     #    -#     #     #     #     #     #\
#      .....    .       D           D                 D     D.    #\
#     #.....#     #     #     #     #     #    .#     #     #     #\
###################################################################\
",
  "\
###################################################################\
#.. .                   D  #                .  #              #-  #\
############# ######### # ## ### ##### ## #### ###### ####### ### #\
#.#!#~# #   #       .-# # #-   #    #   # # -# #      #           #\
# # #.#  .  #   ####### # #    #    #   # #  # #      #       #####\
# # ..# #####   #     # # #### #    ## ## ## # ###### ####### #   #\
# - ..D #   D   #   . D # #  # #.##### ## ## # #. #.# #..#  # ### #\
####### ####### ###   # # #    # #      # D  # D  D   #..D  #     #\
#-                #   # # #### # ###### # ## # #. #   #..#    #####\
### #######################- # # #    ######################  #   #\
#   ...       #   .       #..# ###    #   - ..  .          #. ### #\
#             #           #  # ###    #################### #  #   #\
#                              ###                                #\
################################################################# #\
#-                        D    ###    #          #            #   #\
#  .                      #            #                   #  D   #\
###################################################################\
",
  "\
###################################################################\
#  ..                                                             #\
# ############## ############################################## # #\
#         #    # #                                #     ..    # # #\
#         #D## # # ############D################# ########### # # #\
######### #- # # # #-    D    # # ~  #          # #         # # # #\
#       # #  # # # #   ### #  # #    D   -      # # ####### # # # #\
#  .... # #### # # #   #!# #  # ######      ..  #.# #     # # # # #\
#  .... #      # # # ### # #  # #    #########D#### # ### # # # # #\
#  .... ######## # # D   # #- # #..  #       ...#.# # #.# # # # # #\
#       #        # ###   # #### #.-  D   -      #.# #.#.# # # # # #\
#####DD## ######## #     #    D D.   #          # # #...# # # # # #\
# #   ..# #    # # ############################## # ##### # # # # #\
# ......# #  #   #                                #       # # # # #\
# ####### ###### ################################ ######### # ### #\
#               .D.                                         #     #\
###################################################################\
",
  "\
###################################################################\
#                  ##        ##            ###                ##  #\
#  #####            ## ..-  ##            ##.##              ##   #\
#  # ! ##            ## .  ##            ##  .##    ..      ##    #\
#  #....######        ##  ##            ##  .  ##          ##     #\
#  # -  #    ##        ##D#            ##  .    ##        ##      #\
#  #####D  ~  ####### ###........     ## ...     ##      ##       #\
#  #    #     ##        ##   ....    ##  .        ##    ##        #\
#  #.   ########         ##         ##   .     -  ####D####   -   #\
#  #.-  #...## ##   ...   ##        ###  ......  ##       ##      #\
#  #.   #..##   ##         #########  ##    ... ##   ###   ## ..  #\
#  #..  #.##     ## ## -  ##  .  ####  ##      ##   #####   ##    #\
#  #####D##          ##  ##     ######  ##    ##   #######   ##   #\
#  D  -.##            ####     ########  ##DD##    ########   #D  #\
#  ######   ...        ##     ##########                       ## #\
####                                                 .     .    ###\
###################################################################\
",
  "\
###################################################################\
#                                                                 #\
#     ####.########################################## ## ##########\
#     #      #.#.#.#                   #.. #.   #           #     #\
#######    # # # # #       #####       #!  #    ########### # ### #\
#     #    # # # # #      ##...##      #   #    #         # # #-# #\
# ..- D    # # # # #     ## .   ##     ####D#####  .. ### #   # # #\
#     #    #       #    ##.   ~ .##    #   #    ###   # # ##### # #\
############ # # # #   ##  . .   .##   #...# .. #.#   # #       # #\
#  ..     .# # # # #   ##     -   ##   #   #    D.D   # ######### #\
#      .   D # # # #    ##.......##    ####D#####.#   #           #\
#   - .    # # # # #     ##     ##     # . #    ###   ########### #\
############ #.#.# #      ###D###      # . #....#               # #\
#            # #-# D               ..  #  .#    ###....##  ##-### #\
####   ########################################## ######    ###   #\
#         .                                                       #\
###################################################################\
",
  "\
###################################################################\
#                                                                 #\
#                        ###########################D#######  ##  #\
#  #######################                    # ##...... ##   ##  #\
#                        ########D######  #   # !##.... ##    ##  #\
#   ############    ##  ##    ...      #  #   #...## ~ ## ######  #\
#   #          #    #    # ......      #  #   # .. #####      ##  #\
#   #    - ..  #    #    #   ###########  #   #  .  ######### ##  #\
#   #####  #####    #    #   #            #   #...   ##       ##  #\
#       #  #        ##########  ########  ########DD#### #######  #\
#       #  #  ....  #        #  #             #     #  ##     ##  #\
#   #####  #        #    ....#  #  #########  #     #   ##### ##  #\
#   #-    ######D##########..#  #  #########  #  -  #..  ##   ##  #\
#   #####  #                 #  #             #...  #.....##      #\
#       #  ###################  ###############...  ####   # ######\
#       #                                                         #\
###################################################################\
",
  "\
###################################################################\
#                                                                 #\
########### #####      #####     #####D####    #####       ###### #\
#..       # #-..D ######   ##    # ##     #   ## ..##    ### #### #\
#  #### ### ##### #         ##   #  ##### #  ## ### ##   #   #    #\
#  #  # #       # # ##### #  ##  #      # ####  # #..##### - ###  #\
#  #  # ####### ### #...# #   ########  #       # #~.   ....   #  #\
#  #  #       #     #...# #          #  ######### ##############  #\
#  #  ######  #######   # ###   ###  #       ..                #  #\
#  #       #          - # #-#####!#  # #      ####  ## ####    #  #\
#  ######  #   ########## #.. ....#  # ########  #  #  #  ##   ## #\
#     -.#  #####          ####...##  #    .  .#  #..#  #   ##   # #\
#    ####        ######      #.###   #####.####  ####  ###  ##  # #\
#    #-    #######....####   ......      #.#       .     #   ## # #\
#    #######             ##### ###########.###############    ### #\
#                                         .                       #\
###################################################################\
",
  "\
###################################################################\
#   #     #-   .      #   # # # # # #   #                         #\
# # #     #####.##### # # # # # # # # # # ###########D########### #\
# # #####     # # ### # # # # # # # # # ###     #....    #  #   # #\
# #     #     #       # # # # # # # # # #       #.!. -.. #.##.# # #\
# # . - #     # ####### # # # # # # # # #       ########## ## #   #\
#.#######     #         #       D     #        .              # # #\
#.     -#     ################################################### #\
#   #####     D.                                             .    #\
#  #         ###  ###D### ### ### ###D### ### ### ###D### ###.### #\
#  # ######  ### .#    .# #.    # #     # #     # #     # # .   # #\
#  ### # -#  ### .#. - .# #     # #...- # # ..  # #  -..# # .   # #\
#      #  #  ###  #. ~ .# #     # #     # #     # # .. .# #     # #\
#.######  #  ###  #     # #.....# #     # #     # #     # #     # #\
# #      #######  ####### ####### ####### ####### ####### ####### #\
# # ...                                       ..                  #\
###################################################################\
",
  "\
###################################################################\
#           #  .        #     ###         #     #     #     #   . #\
#           D           D  .        #              .        D .   #\
############################################### #     #     ###D###\
#          -#                 #.    #      # ################ .  .#\
#     #######D######## ############ # #### #                #     #\
# ... #.    # #!~  . # #            # #--# # ############ #####D###\
#     #.# # # ## #   # # ############ #--# # #-  #      # # #.    #\
#  .  # #-# # ## #-  # # #    -     D ## # # # . D #### #.# # ... #\
#     # #-# #    #   # # #   . .    # #    # #   #    # #-# # -.- #\
###D### ### ####### ## # ############ ###### ########## ### ###D###\
#                    #  @          .               .....       ...#\
#####################################           ###############D###\
#  .  #.....#     #     #     #    -#           #     #     #     #\
#      .....    .       D           D                 D     D.    #\
#     #.....#     #     #     #     #          .#     #     #     #\
###################################################################\
",
  "\
###################################################################\
#.. .       #           D                   .                 #-  #\
### ######### ######### # ## ### ##### ## ########### ####### ### #\
#.# #   #   #       .-# # #-   #    #   # # -# #      #           #\
# # #.#  .  #   ####### # #    #    #   # #  # #      #       #####\
# # ..#######   #     # # #### #    ## ## ##!# ###### ####### #   #\
# - ..D #   D   #   . D # #  # #.##### ## ## # #. #.# #..#  # ### #\
####### ####### ###   # # #    # #      # D  # D  D   #..D  #     #\
#-                #   # # #### # ###### # ## # #. #   #..#    #####\
### #######################- # # #    ######################  #   #\
#   ...       #   .       #..# ###    #   - ..  .          #. ### #\
#             #           #  # #-#    #################### #  #   #\
#                         #     -#                                #\
################################-################################ #\
#-.....             # ####D    ###    #          #            #   #\
#~.....              #    #            #                   #  D   #\
###################################################################\
",
  "\
###################################################################\
#  ..                                                             #\
# ############## ############################################## # #\
#         #    # #                                #     ..    # # #\
#         #D## # # ############D################# ########### # # #\
######### #- # # # #-    D    # #.!..#          # #         # # # #\
#   #   # #  # # # #   ### ## # #....D   -      # # ####### # # # #\
#  .... # #### # # #   #~# #  # ######      ..  #.# #     # # # # #\
###....##      # # # ###.# #  #      #########D## # # ### # # # # #\
#  .... ######## # # D  .# #- #  ..  #       ...#.# # #.# # # # # #\
#   #  ##        # ###  .# ####  .-  D   -      #.# #.#.# # # # # #\
#####DD## ######## #... .#       .   #          # # #.#.  # # # # #\
# #   ..# #      # ############################## # # ##### # # # #\
# ......# #  # # #                                # #       # # # #\
# ####### ###### ################################D# ######### ### #\
#               .D.                                           #-.-#\
###################################################################\
",
  "\
###################################################################\
#                  ##        ##         ##        ##          ##  #\
#  ##############   ## ..-  ##          ##  .     ##         ##   #\
#  #    #       ##   ## .  ##           ##   .    ##..      ##    #\
#  #....######   ##   ##  ######## #######  .     ##       ##     #\
#  # -  #    ##   ##   ##D#            ##  .      ##      ##      #\
#  #          D###### ###........     ## ...      ##     ######   #\
#  #    #     ##        ##   ....    ##  .        ##    ##  - #   #\
#  #.   ########         ##         ##   .     -  ####D####.. D   #\
#  #.-  #...## ##   ...   ##        ###  ......  ##       #####   #\
#  #.   #..##   ##         #########  ##    ... ##   ###   ## ..  #\
#  #..  #.##     ## ## -  ##  .  ####  ##      ##   #####   ##    #\
#  #####D#######  #  ##  ##     ##..##  ##    ##   ##   ##   ##   #\
#  D  -.##     #  #   ####     ##.-.-##  ##DD##    ### ####   ##  #\
#  ######.  ...# ####  ##     #### #####                ##     ##D#\
####~!....     D                                     .     .      #\
###################################################################\
",
  "\
###################################################################\
#                                                                 #\
#     ####.########################################## ## ##########\
#     #      #.#.#.#                   #..  .   #           #     #\
#######    # # # # #   #############   #        ########### # ### #\
#     #    # # # # #    --##...##--    #        #         # # #-# #\
# ..- D    # # # # #   #-## .   ##-#   ####D#####  .. ### #   # # #\
#     #    #       #   ###.     .###   # ~ #    ###   ### ##### # #\
############ # # # #   ##  . .   .##   #...# .. #.#             # #\
#  ..     .# # # # #   ##     -   ##   #   #    D.    # ######### #\
#      .   D # # # #   ###.......###   ####D#####.#   #           #\
#   - .    # # # # #    -##     ##-    # .      ###   ########### #\
############ #.#.# #   ######D######   # .  ....#               # #\
#            #!#-# #               ..  #  .     ###....##  ##-### #\
####   ##############################  ########## ######    ###   #\
#  D      .                                                       #\
###################################################################\
",
  "\
###################################################################\
#                                                                 #\
#                        ###############D####################D#   #\
#  #######################                    # ##......      #   #\
#                        ########D######  #   #  ##....       #   #\
#   ############### ##  ##    ...      #  #   #...##      #####   #\
#   #    ~        # #    #!......      #  #   # .. #####      #   #\
#   #    - ..     # #    #   ###########  #   #  .  ######### #   #\
#   #####  ######## #    #   #         #  #   #...   ##       #   #\
#       #  #      # ##########  ########  ########D #### ######   #\
#       #  #  ....# #        #  #             #     #  ##     #   #\
#   #####  # ###### #    ....#  #  #########  #     #   #####D#   #\
#   #-    ## #      #######..#  #  #########  #  -  #..           #\
#   #####  #                 #  #             #...  #.....        #\
#       #  ###################  ###############...  ####     ######\
#       #                                                         #\
###################################################################\
",
  "\
###################################################################\
#                      #                                          #\
########### #####      #         #####D####    #####       ###### #\
#..       # #~..D ######   ##    # ##     #   ## ..##    ### #### #\
#  #### ### ##### #         ##   #  ##### #  ## ### ##   #   #    #\
#  #  # #       # # ##### #  ##  #      # ####  # #..##### - ###  #\
#  #  # ####### ### #...# #   ########  #       # #!.   ....   #  #\
#  #  #       #     #...# #          #  ######### ##############  #\
#  #  ######  #######   # ###   ###  #       ..                #  #\
#  #       #          - # #-    # #  #        ######## ####    #  #\
#  #       #   ########## #.. ....#  # ########        #  ##   ## #\
#  #  -.   #####          ####...##  #    .  .#   ..   #        # #\
#  #             ######      #####   #####.####        #######  # #\
#  #  -    #######....####   ......      #.#       .     #   ## # #\
#  #########             ##### ###########.###############    ### #\
#                                         .                       #\
###################################################################\
",
  "\
###################################################################\
# D D     #-..........#     #   #   #   #                         #\
#D#D#     #####.#####.# #   #   #   # # #############D########### #\
# # #####     #.#~###.# #   #   #   # # ###      ....    #  #   # #\
#D#     #     #.......# #   #   #   # # #        . . -.. #. #.# # #\
# # . - #     #.####### #   #   #   # # ##################    #   #\
#D#######     #.        #       D     #        .              # # #\
#. D D -#     ################################################### #\
#  ######      .                                             .    #\
#  #    D    ###  ###D### ####### ###D### ####### ###D### ####### #\
#  # ######  # # .#    .# #.    # #     # #     # #     # # .   # #\
#  ###   -#  # # .#. - .# #     # #...- # # ..  # #  -..# # .   # #\
#DD#      #  # #  #.   .# #     # #     # #     # # .. .# #     # #\
#.######  #    #  #     # #.....# #     # #     # # !   # #     # #\
# #      #######  ####### ### ### ####### ### ### ####### ### ### #\
# # ...                                       ..                  #\
###################################################################\
",
  "\
###################################################################\
#     D                    ##           ##  ##     ##      #   #  #\
# - . #   #######           ##   -.-   ##  ##      ## ####     D  #\
####  #   #.#-#.#  .#.    # .##       ##   #  ####### .  ###   #  #\
#     # - ##-#.#D  ###    # ..##     ##  ##D   ### ### ### #####  #\
# .   #   # # #.#  .#.    #-   ##...##..######  #      # # #   #  #\
#  ####   #######         ###  -## ##--########   ####     # -.D  #\
#     # #         #         ######D############# ###########   #  #\
#####D# ###########              D D               # # #  .##D##  #\
#     # #         # # #### # #####D############  ###-  D  ##   ####\
# #####   #######   # #!.#-#   #     # . D      ## #   #  .#   #~.#\
#     #   #     #   # #..#####.#     #   ### # ##  ##D######   #..#\
##### #   D #.# # - # #  #   ###     ##### # #    .#   #   ##.##..#\
#  .  #   #     #   # #D## #   #######    .  #    .## .D  ##   #  #\
##### #   #######   #      # #         ### # # ##  #  -#   #   D  #\
#                   #      # ###########   #   ### #####       #  #\
###################################################################\
",
  "\
###################################################################\
#     #   #                  #                                    #\
#  #  D   #  #########         #########################.####     #\
#####.#   #  #       ####D#### #               #.#.#.#      #     #\
#   # #   #  # ##### #   #   # # #    #D#      # # # # #    #######\
# #   #####  # #...# # . # - # #     ## ##     # # # # #    # .   #\
# #  ##  # - # D.#~#-#   #   # #    ##...##    # # # # #    D..!  #\
# ####  ###  ###.. #.####D#### #   ##     ##   # # # # #    # .   #\
# #      #   # #####.#   #   # #   #. -   .#   D D D D ############\
#    ##      #    ## #   # . # #   ##     ##   # # # # #.     ..  #\
# ######.### #   ## ##   #   # #    ##   ##    # # # # D   .      #\
#    ##      #  ## ##..##D#### #     ## ##     # # # # #    . -   #\
# #.     #   #D## ##  ##  #  # #.     ###    # #.#.# # ############\
# ###   ###        ####   #    #-.             # #-# #         D  #\
# #   #. #   ### #   #  -    # ########D#################### . ####\
#     #      #   # #   #  #  #                                 D  #\
###################################################################\
",
  "\
###################################################################\
#  #         -            #            ##  ###   #                #\
# ## # ################## #            ##   #### # #####    #D### #\
#  . # #                  #        #####     D # #  -  # .. #   # #\
# #### # #  ###D###   -   #   --    .  D     D   # ### #    #   # #\
#    ### #  ##  ##        #        ######   #### # # # #    #   # #\
###      ####  ##   ##### #        ######  ###     #   #    #   # #\
# # ########- ##   ##   # #        ############################## #\
# # ###  ##  ##   ###   D                                    .    #\
# # ##  ####  ## ##!#   # ###D### ####### ###D### ####### ###D### #\
#   #  ##  ## .###..##### #     # #..~..# #     # #     # # .   # #\
###D#D###   ##..#..##   # # .- .# #  .  # # ..  # #  -..# # .   # #\
#   #   #    ##...##  - # # .  .# #     # #     # # .. .# #     # #\
# . #     .. ######     # #    .# #.    # #     # #     # #     # #\
#   D        #########  # ####### ###D### ####### ###D### ####### #\
#   #   #    D            #                                       #\
###################################################################\
",
  "\
###################################################################\
#         #    #   #          ##     ##   ##   ##       D         #\
# #. # -# #  # #   #  ####### D##...## ####### ### ###### ######  #\
#         #  # ## ##  #!  .##.# ## ##          D.#      # #~.. D  #\
####D######  #  # .####...## ##  # #######D### #######. # # .### ##\
#  #         #  ##  ####D## ##   #          #   ##   .. # #### # ##\
#  ########  #   ## ###  ### ## ## #### ### #   ##      #      #  #\
#  ########  ###### # .    ## ###   #     # ######D#############  #\
#                      .   ##     - ####### #        #            #\
#           ####### #   .  ## ###   ##   D.   #####D###########D###\
#####D##### #     # ###. ### ##### ### - ## ###  #   #   #   #    #\
#.       -# #.#   # ####### ##     # #   ## #    # .   -   . D    #\
#####D##### # #   #         ##   # # ###### #     #  #   #   #    #\
#-       .# # #   #####D######   # # . #  # #### ######D###########\
##### ##### # #   D   #  #   D   # # # # ####                     #\
#         D   #   D   #  #   D   #   #             ..             #\
###################################################################\
",
  "\
###################################################################\
#     D                    ##           ##  ##     ##      #   #  #\
# - . #   #######           ##   -.-   ##  ##      ## ####     D  #\
####  #   #.#-#.#  .#.    # .##       ##   #  ####### .  ###   #  #\
#     # - ##-#.#D  ###    # ..##     ##  ##D   ### ### ### #####  #\
# .   #   # # #.#  .#.    #-   ##...##..######  #      # # #   #  #\
#  ####   #######      #  ###  -## ##--## #####   ###      # -.D  #\
#     # #         #   ##    ######D######  ##### ####D######   #  #\
#####D# ###########              D D               #   # ..##D##  #\
#     # #         # # #### # #####D############  ###-  D  ##   ####\
# #####   #######   # # .#-#   #     # . D      ## #   # .!#   #  #\
#     #   #  .. #   # #. #####.#     #   ### # ##  ######### . #  #\
##### #   D #.#~# - # #  #   ###     ##### # #    .#   #   ##D##..#\
#  .  #   #  .. #   # #D## #   #######    .  #    .## .D  ##   #  #\
##### #   #######   #      # #         ### # # ##  #  -#   #   D  #\
#                   #      # #         #   #   ### #####       #  #\
###################################################################\
",
  "\
###################################################################\
#     # . #                  #                                    #\
#  #  D .!#  #########         #########################.####     #\
#####.# . #  #       ####D#### #               #.#.#.#      #     #\
#   # #.. #  # ##### #   #   # # ##   #D#   ## # # # # #    ###D###\
# #   #####  # #.  # # . # - # # #-  ## ##  -# # # # # #    # .   #\
# #  ##  # - # D.# #-#   #   # #    ##...##    # # # # #    #..!  #\
# ####  ###  ###.  #.######### #   ##     ##   # # # # #    # .   #\
# #      #   #~#####.#   #   # D   #. -   .#   # D D D ############\
#    ##      #   .## #   # . # #   ##     ##   # # # # #.     ..  #\
# ######.### #...##  #.. #   # #    ##   ##    # # # # D   .      #\
#    ##      #..##  #####D#### # #   ## ##   # # # # # #    . -   #\
# #.     #   #D##   #     #  # #.##   ###   ## #.#.# # ############\
# ###   ###         ####  #    #-.             # #-# #         D  #\
# #   #. #   ### #   #  -    # ############################# . ####\
#     #      #   # #   #  #  #                                 D  #\
###################################################################\
",
  "\
###################################################################\
#  #         -            #        #   #   ###   #                #\
# ## # ################## #          # #    #### # #####    #D### #\
#  . # #                  #        #####     D   #  -  # .. #   # #\
# #### # #  ###D##### -   #   --    .  D     D   # ### #    #   # #\
#    ### #  ##  ##  D     #        #####    #### # # # #    #   # #\
###      ####  ##   ##### #        #####   ###     #   #    #   # #\
# # ########- ##   ##   # #        ############################## #\
# # ###~.##  ##   ###   D                                    .    #\
# # ##..####  ## ## #   # ###D### ####### ###D### ####### ###D### #\
#   #. ##  ## .###. ##### #     # #.   .# #     # #     # #.....# #\
##D##D###   ##. #. ##   # # .- .# #  .  # # ..  # #  -..# #.....# #\
#   #   #    ##.  ##  - # # .  .# #     # #     # # .. .# #     # #\
# . #     .. ######  .. # #    .# #.    # #     # #     # #  !  # #\
#   D        #########D## ####### ### ### ####### ### ### ####### #\
#   #   #    D            #                                       #\
###################################################################\
",
  "\
###################################################################\
#         #    #   #          ##     ##   #     #       D         #\
# #. # -# #  # #   #  ####### D##...## ####### ### ###### ######  #\
# #  #  # #  # ## ##  # .. ##.# ## ##          D.#      # # .  D  #\
#      .  #  #  # .####   ### #  # #######D### #######. # # .### ##\
####D######  #  ##  ####D## # #  #          #    #  ##. # #### # ##\
#         #  #   ## ###  #### # ## #### ### #    #    . #      #  #\
#  #####  #  ###### # .    ## ###   #     # ######D#############  #\
#  #####  #            .   ##     - #######          #            #\
#           ####### #   .  ##  ##    #   D.  ##D###################\
#####D##### #     # ###. ###  ###  # # - ##  #   #   #   #   # ...#\
#.       -# #.#   # #######  ##    # #   ##  #     .   -   . D ..!#\
########### # #   #         ##   # ###########   #   #   #   # ...#\
#-       .# # #   #####D######   # # . #   # ##D###################\
##### ##### # #   D   #..#   D   # # # # # #                      #\
#         D   #   D   #.~#   D   #   #   #         ..             #\
###################################################################\
"
];
