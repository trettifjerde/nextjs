import classes from './logo.module.css';
function Logo({clName}: {clName: string}) {
    return <div className={`${classes.logo} ${clName}`}>windir</div>
}
export default Logo;