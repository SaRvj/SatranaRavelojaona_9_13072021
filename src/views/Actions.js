import eyeBlueIcon from "../assets/svg/eye_blue.js"
import downloadBlueIcon from "../assets/svg/download_blue.js"

export default (billUrl) => {
  return (
    `<div class="icon-actions">
      <div id="eye" data-testid="icon-eye" data-bill-url=${billUrl}>
      ${eyeBlueIcon}
      </div>
      <a href={myPDF} download="http://localhost:5678/public/4b392f446047ced066990b0627cfa444.pdf" data-bill-url=${billUrl}>
      <div id="download" data-testid="icon-download" data-bill-url=${billUrl}>
      ${downloadBlueIcon}
      </div>
      </a>
    </div>`
  )
}

