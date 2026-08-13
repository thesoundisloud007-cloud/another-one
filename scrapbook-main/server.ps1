$port = 8000
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Server running at $prefix"

$rootDir = "d:\scrapbook-main"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".json" = "application/json; charset=utf-8"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        $relPath = $urlPath.TrimStart('/').Replace('/', '\')
        $filePath = Join-Path $rootDir $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            if ($mimeTypes.ContainsKey($ext)) {
                $response.ContentType = $mimeTypes[$ext]
            } else {
                $response.ContentType = "application/octet-stream"
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buf = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($buf, 0, $buf.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
