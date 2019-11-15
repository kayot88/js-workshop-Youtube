"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // экранная клавиатура
  {
    const keyboardButton = document.querySelector(".search-form__keyboard");
    const keyboardItem = document.querySelector(".keyboard");
    const searchInput = document.querySelector(".search-form__input");
    const toggleTop = () => {
      return keyboardItem.style.top
        ? (keyboardItem.style.top = "")
        : (keyboardItem.style.top = "50%");
    };

    keyboardButton.addEventListener("click", () => {
      return toggleTop();
    });
    const closeButton = document.getElementById("close-keyboard");
    closeButton.addEventListener("click", () => {
      return toggleTop();
    });
    const typing = e => {
      const myTarget = e.target;
      const content = myTarget.textContent.trim();

      const arrLetters = [...keyboardItem.querySelectorAll("button")].filter(
        item => {
          return item.style.visibility !== "hidden";
        }
      );
      const changeLang = (btns, lang) => {
        const langRu = [
          "ё",
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          "-",
          "=",
          "⬅",
          "й",
          "ц",
          "у",
          "к",
          "е",
          "н",
          "г",
          "ш",
          "щ",
          "з",
          "х",
          "ъ",
          "ф",
          "ы",
          "в",
          "а",
          "п",
          "р",
          "о",
          "л",
          "д",
          "ж",
          "э",
          "я",
          "ч",
          "с",
          "м",
          "и",
          "т",
          "ь",
          "б",
          "ю",
          ".",
          "en",
          " "
        ];
        const langEn = [
          "`",
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          "-",
          "=",
          "⬅",
          "q",
          "w",
          "e",
          "r",
          "t",
          "y",
          "u",
          "i",
          "o",
          "p",
          "[",
          "]",
          "a",
          "s",
          "d",
          "f",
          "g",
          "h",
          "j",
          "k",
          "l",
          ";",
          '"',
          "z",
          "x",
          "c",
          "v",
          "b",
          "n",
          "m",
          ",",
          ".",
          "/",
          "ru",
          " "
        ];
        if (lang === "en") {
          btns.forEach((elem, i) => {
            elem.textContent = langEn[i];
          });
        }
        if (lang === "ru") {
          btns.forEach((elem, i) => {
            elem.textContent = langRu[i];
          });
        }
      };

      if (myTarget.tagName.toLowerCase() === "button") {
        if (content === "⬅") {
          return (searchInput.value = searchInput.value.slice(0, length - 1));
        } else if (!content) {
          return (searchInput.value += " ");
        } else if (content === "ru" || content === "en") {
          changeLang(arrLetters, content);
        } else {
          return (searchInput.value += myTarget.textContent.trim());
        }
      }
    };

    keyboardItem.addEventListener("click", typing);
  }
  // menu
  {
    const burger = document.querySelector(".spinner");
    const sidebarMenu = document.querySelector(".sidebarMenu");
    burger.addEventListener("click", () => {
      sidebarMenu.classList.toggle("rollUp");
      burger.classList.toggle("active");
    });
    sidebarMenu.addEventListener("click", e => {
      let target = e.target;
      target = target.closest('a[href="#"]');

      if (target) {
        const parentNode = target.parentNode;
        sidebarMenu.querySelectorAll("li").forEach(element => {
          if (element === parentNode) {
            element.classList.add("active");
          } else {
            element.classList.remove("active");
          }
        });
      }
    });
  }
  // youtuber

  const youtuber = () => {
    const divYoutuber = document.querySelector(".youTuberModal");
    const youtuberContainer = document.getElementById("youtuberContainer");
    const youtuberClose = document.getElementById("youtuberClose");
    const youtuberItems = document.querySelectorAll("[data-youtuber]");

    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const sizeVideo = () => {
      console.log("sizeVideo");
      let vw = document.documentElement.clientWidth;
      let vh = document.documentElement.clientHeight;
      for (let index = 0; index < qw.length; index++) {
        if (vw > qw[index]) {
          youtuberContainer.querySelector("iframe").style.cssText = `
       width: ${qw[index]}px;
       height:${qh[index]}px;
       `;
          youtuberContainer.style.cssText = `
       width: ${qw[index]}px;
       height:${qh[index]}px;
       top: ${(vh - qh[index]) / 2}px;
       left: ${(vw - qw[index]) / 2}px;
       `;
          break;
        }
      }
    };

    youtuberItems.forEach(elem => {
      // console.log(elem);
      return elem.addEventListener("click", () => {
        const idVideo = elem.dataset.youtuber;
        // console.log(idVideo);
        divYoutuber.style.display = "block";
        const youTuberFrame = document.createElement("iframe");
        youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
        youtuberContainer.insertAdjacentElement("beforeend", youTuberFrame);
        window.addEventListener("resize", sizeVideo);
        sizeVideo();
      });
    });
    youtuberClose.addEventListener("click", () => {
      divYoutuber.style.display = "";
      youtuberContainer.textContent = "";
      window.removeEventListener("resize", sizeVideo);
    });
  };

  youtuber();

  // youtube api
  {
    const API_KEY = "AIzaSyDOc9wZYiYfHt6Ln_n9_eIxJrlke6RYQwo";
    const AUTH_ID =
      "564463627171-7i1scqci790mh9q2qg09hga9neii733v.apps.googleusercontent.com";
    // authenticate
    {
      const buttonAuth = document.getElementById("authorize");
      const authBlock = document.querySelector(".auth");
      gapi.load("client:auth2", () => {
        gapi.auth2.init({ client_id: AUTH_ID });
      });
      const authenticate = () =>
        gapi.auth2
          .getAuthInstance()
          .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
          .then(() => console.log("Sign-in successful"))
          .catch(errorAuth);

      const loadClient = () => {
        gapi.client.setApiKey(API_KEY);
        return gapi.client
          .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
          .then(() => (authBlock.style.display = "none"))
          .then(() => console.log("GAPI client loaded for API"))
          .catch(errorAuth);
      };

      buttonAuth.addEventListener("click", () => {
        authenticate().then(loadClient);
      });

      const errorAuth = err => console.error(err);
      authBlock.style.display = "";
    }
    // modal
    {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
    <div class="youTuberModal">
      <div id="youtuberClose">&#215;</div>
      <div id="youtuberContainer"></div>
    </div>
    `
      );
      // youtuber
    }
    // requests
    {
      const getData = document.querySelector(".logo-academy");
      const trends = document.getElementById("yt_trend");
      const likes = document.getElementById("yt_like");
      const subsc = document.getElementById("yt_subscriptions");
      const searchForm = document.querySelector(".search-form");
      const request = options =>
        gapi.client.youtube[options.method]
          .list(options)
          .then(response => {
            console.log(response.result.items);
            return response.result.items;
          })
          .then(data =>
            options.method === "subscriptions"
              ? renderSubsc(data)
              : render(data)
          )
          // .then(youtuber)
          .catch(err => console.error(`Some error ${err}`));

      const renderSubsc = data => {
        const ytWrapper = document.getElementById("yt-wrapper");
        ytWrapper.textContent = "";
        data.forEach(items => {
          try {
            const {
              snippet: {
                resourceId: { channelId },
                description,
                title,
                thumbnails: {
                  high: { url }
                }
              }
            } = items;
            ytWrapper.innerHTML += `
            <div class="yt" data-youtuber="${channelId}">
              <div class="yt-thumbnail" style="--aspect-ratio:16/9">
                <img
                  src="${url}"
                  alt="thumbnail"
                  class="yt-thumbnail__img"
                />
              </div>
              <div class="yt-title">
                ${title}
              </div>
              <div class="yt-channel">${description}</div>
            </div>
            `;
          } catch (err) {
            console.error(err);
          }
        });
        ytWrapper.querySelectorAll(".yt").forEach(item => {
          item.addEventListener("click", () => {
            request({
              method: "search",
              part: "snippet",
              channelId: item.dataset.youtuber,
              order: "date",
              maxResults: 50
            });
          });
        });
      };
      const render = data => {
        const ytWrapper = document.getElementById("yt-wrapper");
        ytWrapper.textContent = "";
        data.forEach(items => {
          try {
            const {
              id,
              id: { videoId },
              snippet: {
                channelTitle,
                title,
                resourceId: {
                  videoId: likedVideoId,
                  channelId: subscChannel
                } = {},
                thumbnails: {
                  high: { url }
                }
              }
            } = items;
            ytWrapper.innerHTML += `
            <div class="yt" data-youtuber="${subscChannel ||
              likedVideoId ||
              videoId ||
              id}">
              <div class="yt-thumbnail" style="--aspect-ratio:16/9">
                <img
                  src="${url}"
                  alt="thumbnail"
                  class="yt-thumbnail__img"
                />
              </div>
              <div class="yt-title">
                ${title}
              </div>
              <div class="yt-channel">${channelTitle}</div>
            </div>
            `;
          } catch (err) {
            console.error(err);
          }
        });
        youtuber();
      };
      getData.addEventListener("click", () => {
        request({
          method: "search",
          part: "snippet",
          channelId: "UC0yD2Aw5-HOYUyZCu7hyR9Q",
          order: "date",
          maxResults: 50
        });
      });
      trends.addEventListener("click", () => {
        request({
          method: "videos",
          part: "snippet",
          channelId: "UCoebwHSTvwalADTJhps0emA",
          chart: "mostPopular",
          order: "date",
          maxResults: 50
        });
      });
      likes.addEventListener("click", () => {
        request({
          method: "playlistItems",
          part: "snippet",
          playlistId: "LL0g2x-zU9pPC7Zy37_DBUXg",
          maxResults: 50
        });
      });
      subsc.addEventListener("click", () => {
        request({
          method: "subscriptions",
          part: "snippet,contentDetails",
          maxResults: 50,
          mine: true
        });
      });
      searchForm.addEventListener("submit", e => {
        e.preventDefault();
        const valInput = searchForm.elements[0].value;
        if (!valInput) {
          return alert("Enter some value for search");
        }
        // console.log(searchForm.elements[0].value);
        request({
          method: "search",
          part: "snippet",
          order: "relevance",
          maxResults: 50,
          q: searchForm.elements[0].value
        });
        searchForm.elements[0].value = "";
      });
    }
  }
});
