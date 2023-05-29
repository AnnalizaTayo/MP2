

const checkLoginStatus = () =>{
    const userid = localStorage.getItem('usid');
    const contentContainer = document.querySelector('.content-container');
    const profile = document.querySelector('.username');
    
    if (userid === null) {
        contentContainer.innerHTML = `
            <div class="login-form">
                <header>Login</header>
                <form action="#">
                    <div class="field">
                        <input type="email" placeholder="Email" class="input">
                    </div>

                    <div class="field">
                        <input type="password" placeholder="Password" class="password">
                        <i class='bx bx-hide eye-icon'></i>
                    </div>

                    <div class="form-link">
                        <a href="#" class="forgot-pass">Forgot password?</a>
                    </div>

                    <div class="field button-field">
                        <button>Login</button>
                    </div>
                </form>

                <div class="form-link">
                    <span>Don't have an account? <a href="#" class="link signup-link">Signup</a></span>
                </div>
            </div>
            `;
    } else {
        profile.innerHTML = `<h4>Welcome ${user}</h4>`;
    }
}