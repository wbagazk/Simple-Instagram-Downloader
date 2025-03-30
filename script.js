async function downloadVideo() {
  const videoUrl = document.getElementById('videoUrl').value.trim()
  const resultDiv = document.getElementById('result')
  const loadingSpinner = document.getElementById('loading')
  const loadingText = document.getElementById('loadingText')
  const inputSection = document.getElementById('inputSection')
  resultDiv.innerHTML = ''
  loadingSpinner.style.display = 'block'
  loadingText.style.display = 'block'
  if (!videoUrl) {
    loadingSpinner.style.display = 'none'
    loadingText.style.display = 'none'
    resultDiv.innerHTML = '<p class="error">Silakan masukkan URL video Instagram.</p>'
    return
  }
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.im-rerezz.xyz/api/dl/instagram?url=${encodeURIComponent(videoUrl)}`)}`)
    const data = JSON.parse(response.data.contents)
    if (data.status && Array.isArray(data.data)) {
      let videoLink = null
      for (const item of data.data) {
        if (item.title === "Download Video") {
          videoLink = item.url
          break
        }
      }
      if (videoLink) {
        resultDiv.innerHTML = `
                            <video id="smallVideo" controls>
                                <source src="${videoLink}" type="video/mp4">
                                Browser Anda tidak mendukung pemutaran video.
                            </video>
                            <br><br>
                            <a href="${videoLink}" download class="download-btn">Download Video</a>
                        `
        const smallVideo = document.getElementById('smallVideo')
        smallVideo.onclick = () => openPopup(videoLink)
        inputSection.style.display = 'none'
      } else {
        resultDiv.innerHTML = '<p class="error">Tidak ada video yang ditemukan di URL ini.</p>'
      }
    } else {
      resultDiv.innerHTML = `<p class="error">Gagal mengunduh video. Pesan: ${data.message || 'URL tidak valid.'}</p>`
    }
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">Terjadi kesalahan: ${error.message || 'Coba lagi nanti.'}</p>`
  } finally {
    loadingSpinner.style.display = 'none'
    loadingText.style.display = 'none'
  }
}

function openPopup(videoLink) {
  const popup = document.getElementById('videoPopup')
  const popupVideo = document.getElementById('popupVideo')
  popupVideo.src = videoLink
  popup.style.display = 'flex'
}

function closePopup() {
  const popup = document.getElementById('videoPopup')
  const popupVideo = document.getElementById('popupVideo')
  popup.style.display = 'none'
  popupVideo.src = ''
}