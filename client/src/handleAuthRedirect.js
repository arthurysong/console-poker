export default function handleAuthRedirect(isLoggedIn, history){
    let curr_url = window.location.pathname;
    if (isLoggedIn && (curr_url === "/" || curr_url === "/login" || curr_url === "/register")) { // redirect for setLogin if user is logged in
        history.push(`/rooms`);
    } else if (!isLoggedIn && (curr_url === "/rooms" || curr_url === "/" || curr_url === "/rooms/new")) { // redirect for setLogin at rooms url if usuer is not logged in
        history.push(`/login`)
    } 
}