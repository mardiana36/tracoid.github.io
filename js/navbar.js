$(document.body).prepend(`
     <header class="container site-header">
        <nav class="content nav-content">
            <ul class="nav-card">
                <i class='bx bx-menu' id="iconNavResponsif"></i>
                <li>
                    <a class="logo-web" href="index.html">Tracoid</a>
                </li>
              <div id="divNavResponsif">
                <li class="showHideNav">
                    <form action="">
                        <input class="nav-search" type="text" placeholder="Apa yang ingin Anda pelajari?"/>
                        <i class="button-search"><i class="icon-search bx bx-search-alt bx-tada-hover"></i></i>
                    </form>
                </li>
                <li class="showHideNav">
                    <a href="training.html">Jelajahi Pelatihan</a>
                </li>
                <li class="showHideNav">
                    <div class="container-drop" id="dropDown">
                        <a>
                            <span> Langganan <i class='bx bx-chevron-down' id="iconDown"></i></span>
                        </a>
                        <ol class="content-drop listSubscribe">
                            <div>
                                <li>
                                    <a href="subsFee.html">
                                        <i class='bx bx-credit-card'></i> Biaya Langganan
                                    </a>
                                </li>
                                <li>
                                    <a href="token.html"><i class='bx bxs-calculator'></i> Aktivasi Token
                                    </a>
                                </li>
                            </div>
                        </ol>
                    </div>
                </li>
                <li class="dashboardNav">
                    <a href="dashboard.html">Dashboard</a>
                </li>
                <li class="dashboardNav">
                    <a href="learning.html">Academy</a>
                </li>
              </div>
            </ul>
            <ul class="nav-card">
                <li>
                    <div class="container-darkmode" id="toggleDarkmode">
                        <div class="content-darkmode" id="contentDarkmode"><i class='bx bxs-sun icon-darkmode'
                                id="iconDarkmode"></i></div>
                        <p id="textDarkmode">Mode Terang</p>
                    </div>
                </li>
                <li class="onLogout">
                    <a class="nav-login" href="login.html">Masuk</a>
                </li>
                <li class="onLogout">
                    <a class="nav-regis" href="regis.html">Daftar</a>
                </li>
                <li class="onLogin">
                    <div>
                        <div class="container-drop container-drop2" id="dropDown2">
                            <a id="drop">
                                <span> <i class='bx bxs-user-pin nav-iconUser'></i> <i class='bx bx-chevron-down'
                                        id="iconDown2"></i></span>
                            </a>
                            <ol class="content-drop nav-dropUser">
                                <div>
                                    <li>
                                        <p><b>Sang Putu Mardiana</b></p>
                                    </li>
                                    <li class="li-dropUser">
                                        <p>Bergabung: <b>2024</b></p>
                                    </li>
                                    <li>
                                        <a href="dashboard.html">
                                            <i class='bx bxs-dashboard'></i> Dashboard
                                        </a>
                                    </li>
                                    <li class="li-dropUserLast">
                                        <a href="" id="logout"><i class='bx bx-log-out'></i> Keluar
                                        </a>
                                    </li>
                                </div>
                            </ol>
                        </div>
                    </div>
                </li>
                <li class="onLogin">
                    <div>
                        <div class="container-drop container-drop2" id="dropDown3">
                            <a>
                                <span> <i class='bx bx-bell nav-notif'></i></span>
                            </a>
                            <ol class="content-drop nav-dropUser nav-dropNotif">
                                <div>
                                    <li>
                                        <p class="titleNotif">Notifikasi</p>
                                        <div id="divNotif">
                                            <div>
                                                <div>
                                                    <h4>Progarm Baru Untuk Anda</h4>
                                                    <p>3 menit lalu</p>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                            </div>
                                            <div>
                                                <div>
                                                    <h4>Progarm Baru Untuk Anda</h4>
                                                    <p>3 menit lalu</p>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ol>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    </header>
    `);
$(function () {
  let navBar = $(".site-header");

  if (
    window.location.pathname.includes("login.html") ||
    window.location.pathname.includes("regis.html")
  ) {
    navBar.addClass("navLogin");
    $(window).scroll(function () {
      let scrollTop = $(this).scrollTop();
      if (scrollTop > 100) {
        navBar.addClass("navLoginActif");
      } else {
        navBar.removeClass("navLoginActif");
      }
    });
  } else {
    navBar.removeClass("navLogin");
  }
});
