enchant();

window.onload = function() {
    var c_blocks_width = 10;
    var c_blocks_height = 20;
    var c_fallblock_first_pos_x = 3;
    var c_fallblock_first_pos_y = -1;
    var c_fallblock_patterns = [
        [   // I block
            [[0,0,0,0],
             [1,1,1,1],
             [0,0,0,0],
             [0,0,0,0]],
            [[0,1,0,0],
             [0,1,0,0],
             [0,1,0,0],
             [0,1,0,0]],
            [[0,0,0,0],
             [0,0,0,0],
             [1,1,1,1],
             [0,0,0,0]],
            [[0,0,1,0],
             [0,0,1,0],
             [0,0,1,0],
             [0,0,1,0]],
        ],
        [   // O block
            [[0,0,0,0],
             [0,2,2,0],
             [0,2,2,0],
             [0,0,0,0]],
            [[0,0,0,0],
             [0,2,2,0],
             [0,2,2,0],
             [0,0,0,0]],
            [[0,0,0,0],
             [0,2,2,0],
             [0,2,2,0],
             [0,0,0,0]],
            [[0,0,0,0],
             [0,2,2,0],
             [0,2,2,0],
             [0,0,0,0]],
        ],
        [   // S block
            [[0,0,0,0],
             [0,3,3,0],
             [3,3,0,0],
             [0,0,0,0]],
            [[0,0,0,0],
             [3,0,0,0],
             [3,3,0,0],
             [0,3,0,0]],
            [[0,0,0,0],
             [0,0,0,0],
             [0,3,3,0],
             [3,3,0,0]],
            [[0,0,0,0],
             [0,3,0,0],
             [0,3,3,0],
             [0,0,3,0]],
        ],
        [   // Z block
            [[0,0,0,0],
             [4,4,0,0],
             [0,4,4,0],
             [0,0,0,0]],
            [[0,0,0,0],
             [0,4,0,0],
             [4,4,0,0],
             [4,0,0,0]],
            [[0,0,0,0],
             [0,0,0,0],
             [4,4,0,0],
             [0,4,4,0]],
            [[0,0,0,0],
             [0,0,4,0],
             [0,4,4,0],
             [0,4,0,0]],
        ],
        [   // J block
            [[0,0,0,0],
             [5,0,0,0],
             [5,5,5,0],
             [0,0,0,0]],
            [[0,0,0,0],
             [0,5,0,0],
             [0,5,0,0],
             [5,5,0,0]],
            [[0,0,0,0],
             [0,0,0,0],
             [5,5,5,0],
             [0,0,5,0]],
            [[0,0,0,0],
             [0,5,5,0],
             [0,5,0,0],
             [0,5,0,0]],
        ],
        [   // L block
            [[0,0,0,0],
             [0,0,6,0],
             [6,6,6,0],
             [0,0,0,0]],
            [[0,0,0,0],
             [6,6,0,0],
             [0,6,0,0],
             [0,6,0,0]],
            [[0,0,0,0],
             [0,0,0,0],
             [6,6,6,0],
             [6,0,0,0]],
            [[0,0,0,0],
             [0,6,0,0],
             [0,6,0,0],
             [0,6,6,0]],
        ],
        [   // T block
            [[0,0,0,0],
             [0,7,0,0],
             [7,7,7,0],
             [0,0,0,0]],
            [[0,0,0,0],
             [0,7,0,0],
             [7,7,0,0],
             [0,7,0,0]],
            [[0,0,0,0],
             [0,0,0,0],
             [7,7,7,0],
             [0,7,0,0]],
            [[0,0,0,0],
             [0,7,0,0],
             [0,7,7,0],
             [0,7,0,0]],
        ],
    ];
    
    var create_initial_blocks = function() {
        var cols = new Array(c_blocks_height);
        for (var y = 0; y < c_blocks_height; y++) {
            var row = new Array(c_blocks_width);
            for (var x = 0; x < c_blocks_width; x++) {
                row[x] = 0;;
            }
            cols[y] = row;
        }
        return cols;
    };
    
    var is_valid_fallblock_position = function(field_blocks, fallblock_pattern, pos_x, pos_y) {
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 4; x++) {
                if (fallblock_pattern[y][x] != 0) {
                    var field_x = pos_x + x;
                    var field_y = pos_y + y;
                    // check field border
                    if (field_x < 0 || c_blocks_width <= field_x || field_y < 0 || c_blocks_height <= field_y) {
                        return false;
                    }
                    // check field block
                    if (field_blocks[field_y][field_x] != 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    
    var copy_field_blocks = function(dst, src) {
        for (x = 0; x < c_blocks_width; x++) {
            for (y = 0; y < c_blocks_height; y++) {
                dst[y][x] = src[y][x];
            }
        }
    }
    
    var initialize_input_extention = function(input) {
        input._repeat_start_frame = 8;
        input._repeat_trig_frame = 2;
        input._hold_right_frame = 0;
        input._hold_left_frame = 0;
        input._hold_up_frame = 0;
        input._hold_down_frame = 0;
        input._hold_a_frame = 0;
        input._hold_b_frame = 0;
        input.trig_right = false;
        input.trig_left = false;
        input.trig_up = false;
        input.trig_down = false;
        input.trig_a = false;
        input.trig_b = false;
        input.repeat_right = false;
        input.repeat_left = false;
        input.repeat_up = false;
        input.repeat_down = false;
        input.repeat_a = false;
        input.repeat_b = false;
    }
    
    var update_input_extention = function(input) {
        input.trig_right = input.right && input._hold_right_frame == 0;
        input.trig_left = input.left && input._hold_left_frame == 0;
        input.trig_up = input.up && input._hold_up_frame == 0;
        input.trig_down = input.down && input._hold_down_frame == 0;
        input.trig_a = input.a && input._hold_a_frame == 0;
        input.trig_b = input.b && input._hold_b_frame == 0;
        input.repeat_right = (input._hold_right_frame >= input._repeat_start_frame
                            && (input._hold_right_frame - input._repeat_start_frame) % input._repeat_trig_frame == 0);
        input.repeat_left = (input._hold_left_frame >= input._repeat_start_frame
                            && (input._hold_left_frame - input._repeat_start_frame) % input._repeat_trig_frame == 0);
        input.repeat_up = (input._hold_up_frame >= input._repeat_start_frame
                        && (input._hold_up_frame - input._repeat_start_frame) % input._repeat_trig_frame == 0);
        input.repeat_down = (input._hold_down_frame >= input._repeat_start_frame
                            && (input._hold_down_frame - input._repeat_start_frame) % input._repeat_trig_frame == 0);
        input.repeat_a = (input._hold_a_frame >= input._repeat_start_frame
                        && (input._hold_a_frame - input._repeat_start_frame) % input._repeat_trig_frame == 0);
        input.repeat_b = (input._hold_b_frame >= input._repeat_start_frame
                        && (input._hold_b_frame - input._repeat_start_frame) % input._repeat_trig_frame == 0);
        input._hold_right_frame = input.right ? input._hold_right_frame + 1 : 0;
        input._hold_left_frame = input.left ? input._hold_left_frame + 1 : 0;
        input._hold_up_frame = input.up ? input._hold_up_frame + 1 : 0;
        input._hold_down_frame = input.down ? input._hold_down_frame + 1 : 0;
        input._hold_a_frame = input.a ? input._hold_a_frame + 1 : 0;
        input._hold_b_frame = input.b ? input._hold_b_frame + 1 : 0;
    };
    
    var game = new Game(180, 360);
    game.preload('block.png', 'cursor1.mp3', 'tm2_shoot001.mp3', 'se05.mp3', 'rotate_left.png', 'rotate_right.png');
    game.fps = 60;
    game.keybind(88, 'a'); // A button -> x
    game.keybind(90, 'b');  // B button -> z
    game.onload = function() {
        var map = new Map(18, 18);
        map.image = game.assets['block.png'];
        map._field_blocks = create_initial_blocks();
        map._view_blocks = create_initial_blocks();
        map._fallblock_kind = Math.floor(Math.random() * 7);
        map._fallblock_rotation = 0;
        map._fallblock_pos_x = c_fallblock_first_pos_x;
        map._fallblock_pos_y = c_fallblock_first_pos_y;
        map._gravity = 0.05;
        map._gravity_charge = 0;
        map._no_move_count = 0;
        map._no_move_count_limit = 20;
        map._is_gameover = false;
        map.backgroundColor = '#333333';
        map.loadData(map._view_blocks);
        initialize_input_extention(game.input);
        game.assets['cursor1.mp3'].volume = 0.2;
        game.assets['se05.mp3'].volume = 0.5;
        
        map.addEventListener('enterframe', function() {
            var y, x;
            update_input_extention(game.input);
            var diff_x = 0;
            var diff_y = 0;
            var is_hard_drop = false;
            var is_move = false;
            var is_input = false;
            var new_rotation = this._fallblock_rotation;
            if ( ! this._is_gameover) {
                if (game.input.trig_right || game.input.repeat_right) {
                    diff_x = 1;
                    is_input = true;
                } else if (game.input.trig_left || game.input.repeat_left) {
                    diff_x = -1;
                    is_input = true;
                }
                if (game.input.trig_down || game.input.repeat_down) {
                    diff_y = 1;
                    is_input = true;
                }
                if (game.input.trig_up) {
                    diff_y = 20;
                    is_hard_drop = true;
                }
                this._gravity_charge += map._gravity;
                if (this._gravity_charge >= 1) {
                    diff_y += Math.floor(this._gravity_charge);
                }
                
                if (game.input.trig_a) {
                    is_input = true;
                    new_rotation += 1;
                    if (new_rotation >= 4) {
                        new_rotation = 0;
                    }
                } else if (game.input.trig_b) {
                    is_input = true;
                    new_rotation -= 1;
                    if (new_rotation < 0) {
                        new_rotation = 3;
                    }
                }
                var pattern = c_fallblock_patterns[this._fallblock_kind][this._fallblock_rotation];
                
                if (diff_x != 0) {
                    if (is_valid_fallblock_position(this._field_blocks, pattern, this._fallblock_pos_x + diff_x, this._fallblock_pos_y)) {
                        this._fallblock_pos_x += diff_x;
                        is_move = true;
                    }
                }
                var last_valid_diff_y = 0;
                for (y = 1; y <= diff_y; y++) {
                    if (is_valid_fallblock_position(this._field_blocks, pattern, this._fallblock_pos_x, this._fallblock_pos_y + y)) {
                        last_valid_diff_y = y;
                    } else {
                        break;
                    }
                }
                if (last_valid_diff_y > 0) {
                    this._fallblock_pos_y += last_valid_diff_y;
                    this._gravity_charge = 0;
                    is_move = true;
                }
                if (this._fallblock_rotation != new_rotation) {
                    pattern = c_fallblock_patterns[this._fallblock_kind][new_rotation];
                    if (is_valid_fallblock_position(this._field_blocks, pattern, this._fallblock_pos_x, this._fallblock_pos_y)) {
                        this._fallblock_rotation = new_rotation;
                        is_move = true;
                    }
                }
            }
            
            copy_field_blocks(this._view_blocks, this._field_blocks);
            {
                var fallblock_pattern = c_fallblock_patterns[this._fallblock_kind][this._fallblock_rotation];
                
                for (y = 0; y < 4; y++) {
                    var by = this._fallblock_pos_y + y;
                    for (x = 0; x < 4; x++) {
                        var bx = this._fallblock_pos_x + x;
                        if (0 <= bx && bx < c_blocks_width && 0 <= by && by < c_blocks_height) {
                            if (fallblock_pattern[y][x] != 0) {
                                this._view_blocks[by][bx] = fallblock_pattern[y][x];
                            }
                        }
                    }
                }
            }
            this.loadData(this._view_blocks);
            
            if (is_move) {
                this._no_move_count = 0;
                if (is_input) {
                    game.assets['cursor1.mp3'].play();
                }
            } else {
                this._no_move_count += 1;
            }
            if ( ! this._is_gameover && (this._no_move_count_limit <= this._no_move_count || is_hard_drop)) {
                copy_field_blocks(this._field_blocks, this._view_blocks);
                var is_erased = false;
                
                // erase completed row
                for (y = c_blocks_height - 1; y >= 0;) {
                    var completed = true;
                    for (x = 0; x < c_blocks_width; x++) {
                        if (this._field_blocks[y][x] == 0) {
                            completed = false;
                            break;
                        }
                    }
                    if (completed) {
                        var erased_row = this._field_blocks.splice(y, 1)[0];
                        for (var i = 0; i < c_blocks_width; i++) {
                            erased_row[i] = 0;
                        }
                        this._field_blocks.unshift(erased_row);
                        is_erased = true;
                    } else {
                        y -= 1;
                    }
                }
                
                this._fallblock_pos_x = c_fallblock_first_pos_x;
                this._fallblock_pos_y = c_fallblock_first_pos_y;
                this._fallblock_rotation = 0;
                this._gravity_charge = 0;
                this._no_move_count = 0;
                this._fallblock_kind = Math.floor(Math.random() * 7);
                
                if (is_valid_fallblock_position(this._field_blocks, 
                    c_fallblock_patterns[this._fallblock_kind][this._fallblock_rotation], this._fallblock_pos_x, this._fallblock_pos_y))
                {
                    if (is_erased) {
                        game.assets['se05.mp3'].play();
                    } else {
                        game.assets['tm2_shoot001.mp3'].play();
                    }
                } else {
                    this._is_gameover = true;
                }
            }
        });
        
        var pad = new Pad();
        pad.y = 260;
        
        var rotate_left = new Sprite(48, 48);
        rotate_left.image = game.assets['rotate_left.png'];
        rotate_left.x = 120;
        rotate_left.y = 260;
        rotate_left.buttonMode = 'a';
        
        var rotate_right = new Sprite(48, 48);
        rotate_right.image = game.assets['rotate_right.png'];
        rotate_right.x = 120;
        rotate_right.y = 310;
        rotate_right.buttonMode = 'b';
        
        game.rootScene.addChild(map);
        game.rootScene.addChild(rotate_left);
        game.rootScene.addChild(rotate_right);
        game.rootScene.addChild(pad);
    };
    
    game.start();
};
