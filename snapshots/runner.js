import path from "path"

const tests = []

export function test(style, name, source, lang) {
  if (style === "scratch2") {
    // We don't support scratch2
    return
  }

  tests.push({
    style,
    name,
    source,
    lang: lang || "en",
  })

  if (style === "scratch3") {
    tests.push({
      style: "scratch3-high-contrast",
      name,
      source,
      lang: lang || "en",
    })
  }
}

export function runTests(r) {
  return Promise.all(
    tests.map(tc => {
      const outputPath = path.join(
        "snapshots",
        tc.style,
        tc.name.replace(/ /g, "-") + ".png",
      )
      console.log("running", tc.name)
      return (async () => {
        const options = {
          lang: tc.lang,
          style: tc.style,
          scale: 1,
        }
        await r.snapshotToFile(tc.source, options, outputPath)
        console.log("✓ wrote", outputPath)
      })()
    }),
  )
}
