import TextureResidentialDefault from '../assets/buildings/b_res_default.png';
import TextureCommercialDefault from '../assets/buildings/b_com_default.png';
import TextureIndustryDefault from '../assets/buildings/b_ind_default.png';
import TextureHouseFront1 from '../assets/buildings/b_house_front_lvl1_1.png';
import TextureHouseBack1 from '../assets/buildings/b_house_back_lvl1_1.png';
import TextureHouseTop1 from '../assets/buildings/b_house_top_lvl1_1.png';
import TextureHouseSide1 from '../assets/buildings/b_house_side_lvl1_1.png';
import TextureHouseSide2 from '../assets/buildings/b_house_side_lvl1_2.png';


export const buildings_levels_codes = {
    1: {
        'height': 1
    },
    2: {
        'height': 2
    },
    3: {
        'height': 3
    },
    4: {
        'height': 6
    },
    5: {
        'height': 8
    }
}

export const buildings_textures_codes = {
    // [FRONT,BACK,TOP,BOTTOM,LEFT,RIGHT]
    1: { // residential
        0: TextureResidentialDefault, // default
        1: [TextureHouseFront1,TextureHouseBack1,TextureHouseTop1,TextureHouseTop1,TextureHouseSide1,TextureHouseSide2], // levels
        2: [TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault],
        3: [TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault],
        4: [TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault],
        5: [TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault]
    },
    2: { // commercial
        0: TextureCommercialDefault, // default
        1: [TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault],
        2: [TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault],
        3: [TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault],
        4: [TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault],
        5: [TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault]
    },
    3: { // industry
        0: TextureIndustryDefault, // default
        1: [TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault],
        2: [TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault],
        3: [TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault],
        4: [TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault],
        5: [TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault]
    }
}