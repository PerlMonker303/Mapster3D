import TextureResidentialDefault from '../assets/buildings/b_res_default.png';
import TextureCommercialDefault from '../assets/buildings/b_com_default.png';
import TextureIndustryDefault from '../assets/buildings/b_ind_default.png';
import TextureResL1Front1 from '../assets/buildings/b_res_front_lvl1_1.png';
import TextureResL1Back1 from '../assets/buildings/b_res_back_lvl1_1.png';
import TextureResL1Top1 from '../assets/buildings/b_res_top_lvl1_1.png';
import TextureResL1Side1 from '../assets/buildings/b_res_side_lvl1_1.png';
import TextureResL1Side2 from '../assets/buildings/b_res_side_lvl1_2.png';
import TextureResL2Front1 from '../assets/buildings/b_res_front_lvl2_1.png';
import TextureResL2Back1 from '../assets/buildings/b_res_back_lvl2_1.png';
import TextureResL2Top1 from '../assets/buildings/b_res_top_lvl2_1.png';
import TextureResL2Side1 from '../assets/buildings/b_res_side_lvl2_1.png';
import TextureResL2Side2 from '../assets/buildings/b_res_side_lvl2_2.png';
import TextureComL1Front1 from '../assets/buildings/b_com_front_lvl1_1.png';
import TextureComL1Back1 from '../assets/buildings/b_com_back_lvl1_1.png';
import TextureComL1Top1 from '../assets/buildings/b_com_top_lvl1_1.png';
import TextureComL1Side1 from '../assets/buildings/b_com_side_lvl1_1.png';
import TextureComL1Side2 from '../assets/buildings/b_com_side_lvl1_2.png';
import TextureComL2Front1 from '../assets/buildings/b_com_front_lvl2_1.png';
import TextureComL2Back1 from '../assets/buildings/b_com_back_lvl2_1.png';
import TextureComL2Top1 from '../assets/buildings/b_com_top_lvl2_1.png';
import TextureComL2Side1 from '../assets/buildings/b_com_side_lvl2_1.png';
import TextureComL2Side2 from '../assets/buildings/b_com_side_lvl2_2.png';
import TextureIndL1Front1 from '../assets/buildings/b_ind_front_lvl1_1.png';
import TextureIndL1Back1 from '../assets/buildings/b_ind_back_lvl1_1.png';
import TextureIndL1Top1 from '../assets/buildings/b_ind_top_lvl1_1.png';
import TextureIndL1Side1 from '../assets/buildings/b_ind_side_lvl1_1.png';
import TextureIndL1Side2 from '../assets/buildings/b_ind_side_lvl1_2.png';
import TextureIndL2Front1 from '../assets/buildings/b_ind_front_lvl2_1.png';
import TextureIndL2Back1 from '../assets/buildings/b_ind_back_lvl2_1.png';
import TextureIndL2Top1 from '../assets/buildings/b_ind_top_lvl2_1.png';
import TextureIndL2Side1 from '../assets/buildings/b_ind_side_lvl2_1.png';
import TextureIndL2Side2 from '../assets/buildings/b_ind_side_lvl2_2.png';


export const buildings_levels_codes = {
    1: {
        'height': 1,
        'residents': 5
    },
    2: {
        'height': 2,
        'residents': 20
    },
    3: {
        'height': 3,
        'residents': 50
    },
    4: {
        'height': 6,
        'residents': 150
    },
    5: {
        'height': 8,
        'residents': 250
    }
}

export const buildings_textures_codes = {
    // [FRONT,BACK,TOP,BOTTOM,LEFT,RIGHT]
    1: { // residential
        0: TextureResidentialDefault, // default
        1: [TextureResL1Front1,TextureResL1Back1,TextureResL1Top1,TextureResL1Top1,TextureResL1Side1,TextureResL1Side2], // levels
        2: [TextureResL2Front1,TextureResL2Back1,TextureResL2Top1,TextureResL2Top1,TextureResL2Side1,TextureResL2Side2],
        3: [TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault],
        4: [TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault],
        5: [TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault,TextureResidentialDefault]
    },
    2: { // commercial
        0: TextureCommercialDefault, // default
        1: [TextureComL1Front1,TextureComL1Back1,TextureComL1Top1,TextureComL1Top1,TextureComL1Side1,TextureComL1Side2],
        2: [TextureComL2Front1,TextureComL2Back1,TextureComL2Top1,TextureComL2Top1,TextureComL2Side1,TextureComL2Side2],
        3: [TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault],
        4: [TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault],
        5: [TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault,TextureCommercialDefault]
    },
    3: { // industry
        0: TextureIndustryDefault, // default
        1: [TextureIndL1Front1,TextureIndL1Back1,TextureIndL1Top1,TextureIndL1Top1,TextureIndL1Side1,TextureIndL1Side2],
        2: [TextureIndL2Front1,TextureIndL2Back1,TextureIndL2Top1,TextureIndL2Top1,TextureIndL2Side1,TextureIndL2Side2],
        3: [TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault],
        4: [TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault],
        5: [TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault,TextureIndustryDefault]
    }
}
