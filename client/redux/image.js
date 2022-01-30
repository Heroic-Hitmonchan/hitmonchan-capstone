
const SET_NEW_IMAGE = 'SET_NEW_IMAGE';
const SHOW_CAMERA = 'SHOW_CAMERA';
const HAS_PERMISSION = 'HAS_PERMISSION';

export const setNewCapturedImage = (image) => {
    return {
        type: SET_NEW_IMAGE,
        image
    }
}

export const showTheCamera = (value) => {
    return {
        type: SHOW_CAMERA,
        showCamera: value
    }
}

export const hasPermission = (value) => {
    return {
        type: HAS_PERMISSION,
        permission: value
    }
}

initialState = {
    image: '',
    showCamera: false,
    permission: false
}

export default function (state = {}, action) {
    switch (action.type) {
        case SET_NEW_IMAGE:
            return { ...state, image: action.image };
        case SHOW_CAMERA:
            return { ...state, showCamera: action.showCamera };
        case HAS_PERMISSION:
            return { ...state, permission: action.permission };
        default:
            return state;
    }
}
