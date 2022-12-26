import auth from './Auth';
import home from './DashBoard';


// type rotuerType = {
//     auth: boolean,
//     elementPath: string,
//     name: string,
//     path: string[]
// }
// type comman = { reducer: any, router: rotuerType[] };

// interface MyObjLayout {
//     auth: comman;
//     home: comman
// }
const containers: any = { home: home, auth: auth };

export default containers