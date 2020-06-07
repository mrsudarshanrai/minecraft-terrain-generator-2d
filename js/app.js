var bedrock, stone, dirt, grass, cloud, cloud_y, water, tree;

var bh = 4;

function main() {
    document.querySelector("#game").style.height = 128 * bh + "px";
    document.querySelector("#game").style.width = 128 * bh + "px";
    bedrock = gen_block_maxtop(6, 2, 1, 128);
    stone = gen_block_maxtop(45, 30, 2, 128);
    dirt = gen_block_maxtop(60, 50, 1, 128);
    grass = gen_block_grass(dirt, 128);
    water = gen_block_water(grass);
    cloud = gen_air_cloud(128);
    cloud_y = gen_air_cloudY(cloud.length - 1);
    gen_world(128, 128);
    gen_block_ore(128, 128);
    gen_cor_tree(128)
}

function gen_cor_tree(width) {
    var res;
    for (x = 0; x < width; x++) {
        if (random_range(100, 0) > 90) {
            if (grass[x] + 1 > water)
                gen_natural_tree(x, grass[x] + 1);
        }
    }
}

function gen_natural_tree(x, y) {
    instance_create("wood", x, y, 128);
    instance_create("wood", x, y + 1, 128);
    instance_create("hoja", x, y + 2, 128);
    instance_create("hoja", x - 1, y + 2, 128);
    instance_create("hoja", x + 1, y + 2, 128);
    instance_create("hoja", x - 1, y + 3, 128);
    instance_create("hoja", x, y + 3, 128);
    instance_create("hoja", x + 1, y + 3, 128);
    instance_create("hoja", x, y + 4, 128);
}

function gen_block_water(nv) {
    var res = 0;
    for (x = 0; x < nv.length; x++) {
        res += nv[x];
    }
    return Math.floor(res / nv.length) - 1
}

function gen_block_grass(dirt, width) {
    var res = [];
    for (x = 0; x < width; x++) {
        res[x] = dirt[x] + 1;
    }
    return res;
}

function random_range(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gen_air_cloud(width) {
    var res = [];
    var max = random_range(2, 8);
    for (x = 0; x < max; x++) {
        res[x] = random_range(0, 127);
    }
    return res;
}

function gen_air_cloudY(len) {
    var res = [];
    for (x = 0; x < len; x++) {
        res[x] = random_range(115, 128);
    }
    return res;
}

function gen_block_ore(height, width) {
    var res = 0;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            if (y > bedrock[x] && y <= stone[x]) {
                if (random_range(5000, 0) <= 1) {
                    instance_create("iron", x, y, 128);
                } else if (random_range(1500, 0) <= 2) {
                    instance_create("coal", x, y, 128)
                }
            }
        }
    }
}

function gen_block_maxtop(max, min, diff, width) {
    var res = [];
    for (x = 0; x < width; x++) {
        if (x == 0) {
            res[x] = Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            res[x] = res[x - 1] + Math.floor(Math.random() * (diff - (-diff) + 1)) + (-diff);
            if (res[x] > max) { res[x] = max }
            if (res[x] < min) { res[x] = min }
        }
    }

    return res;
}



function gen_world(height, width) {
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            if (y <= bedrock[x]) {
                instance_create("bedrock", x, y, 128);
            } else if (y <= stone[x]) {
                instance_create("stone", x, y, 128);
            } else if (y <= dirt[x]) {
                instance_create("dirt", x, y, 128);
            } else if (y <= grass[x]) {
                if (y > water)
                    instance_create("grass", x, y, 128);
                else
                    instance_create("sand", x, y, 128)
            } else if (y <= water) {
                instance_create("water", x, y, 128);
            } else {
                instance_create("air", x, y, 128);
            }

            for (l = 0; l < cloud_y.length; l++)
                if (y > cloud_y[l] - 5 && y < cloud_y[l] + 5) {
                    for (z = 0; z < cloud.length; z++) {
                        if (x > cloud[z] - 7 && x < cloud[z] + 7) {
                            instance_create("cloud", x, y, 128);
                        }
                    }
                }
        }
    }
}

function bgrass() {
    var grass_top = document.createElement("div");
    grass_top.style.height = bh / 4 + "px";
    grass_top.style.width = bh + "px";
    grass_top.style.backgroundColor = "#4d4";
    grass_top.style.position = "absolute";
    grass_top.style.left = "0px";
    grass_top.style.top = "0px";
    return grass_top;
}

function block_create(type) {
    var block = document.createElement("div");

    block.style.height = bh + "px";
    block.style.width = bh + "px";
    block.style.position = "absolute";

    switch (type) {
        case "bedrock":
            block.style.backgroundColor = "#111";
            break;
        case "stone":
            block.style.backgroundColor = "#444";
            break;
        case "dirt":
            block.style.backgroundColor = "#632";
            break;
        case "grass":
            block.style.backgroundColor = "#632";
            block.appendChild(bgrass());
            break;
        case "water":
            block.style.backgroundColor = "#11f";
            break;
        case "air":
            block.style.backgroundColor = "#99f";
            break;
        case "cloud":
            block.style.backgroundColor = "rgba(255,255,255,0.5)";
            break;
        case "iron":
            block.style.backgroundColor = "#444";
            block.appendChild(iron());
            break;
        case "coal":
            block.style.backgroundColor = "#444";
            block.appendChild(coal());
            break;
        case "wood":
            block.style.backgroundColor = "#521";
            break;
        case "hoja":
            block.style.backgroundColor = "#0f0";
    }

    return block;
}

function iron() {
    var res = document.createElement("div");
    res.style.height = "2px";
    res.style.width = "2px";
    res.style.backgroundColor = "#999";
    res.style.marginLeft = "auto";
    res.style.marginRight = "auto";
    res.style.marginTop = "25%";
    return res;
}

function coal() {
    var res = document.createElement("div");
    res.style.height = "2px";
    res.style.width = "2px";
    res.style.backgroundColor = "#050505";
    res.style.marginLeft = "auto";
    res.style.marginRight = "auto";
    res.style.marginTop = "25%";
    return res;
}

function instance_create(obj, x, y, height) {
    var block = block_create(obj);

    /*switch(obj){
        case "bedrock":
            block = block_create("bedrock");
            break;
        case "stone":
            block = block_create("stone");
            break;
        case "dirt":
            block = block_create("dirt");
            break;
        case "grass":
            block = block_create("grass");
            break;
        case "air":
            block = block_create("air");
            break;
        case "cloud":
            block = block_create("cloud");
            break;
        case "water":
            block = block_create("water");
            break;
        case "iron":
            block = block_create("iron");
            break;
        case "coal":
            block = block_create("coal");
            break
    }*/

    block.style.left = x * bh + "px";
    block.style.top = (height * bh - y * bh) + "px";

    document.querySelector("#game").appendChild(block);
}