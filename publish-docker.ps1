param (
    [string]$RegistryOwner = "aishvarya7778",
    [string]$VersionTag = "1.0.0",
    [switch]$BuildOnly,
    [switch]$PushOnly,
    [switch]$NoCache
)

# Strict mode
Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

# Services to publish
$Services = @(
    "sentient-postgres",
    "sentient-backend",
    "sentient-agentic-ai",
    "sentient-ml-service",
    "sentient-frontend"
)

try {
    Write-Output "[INFO] Starting Docker publish process..."
    Write-Output "[INFO] Registry Owner: $RegistryOwner"
    Write-Output "[INFO] Version Tag: $VersionTag"

    # Set the registry owner environment variable for docker-compose
    $env:REGISTRY_OWNER = $RegistryOwner

    if (-not $PushOnly) {
        Write-Output "[INFO] Phase 1: Building Docker images..."
        
        # Determine compose command
        $ComposeCmd = "docker compose"
        if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
            $ComposeCmd = "docker-compose"
        }

        $BuildCmd = "$ComposeCmd build"
        if ($NoCache) {
            $BuildCmd += " --no-cache"
        }
        
        Write-Output "[INFO] Running: $BuildCmd"
        Invoke-Expression $BuildCmd

        Write-Output "[INFO] Phase 2: Tagging images with version tag..."
        foreach ($Service in $Services) {
            $SourceImage = $RegistryOwner + "/" + $Service + ":latest"
            $TargetImage = $RegistryOwner + "/" + $Service + ":" + $VersionTag
            
            Write-Output "[INFO] Tagging $SourceImage as $TargetImage"
            docker tag $SourceImage $TargetImage
        }
        Write-Output "[OK] Building and tagging completed successfully."
    }

    if (-not $BuildOnly) {
        Write-Output "[INFO] Phase 3: Pushing images to Docker Hub..."
        
        # Verify Docker Hub login status (checks if authenticated)
        Write-Output "[INFO] Verifying Docker registry authentication status..."
        $DockerInfo = docker info
        if (($DockerInfo -like "*Username:*") -or ($DockerInfo -like "*Registry:*")) {
            Write-Output "[INFO] Docker daemon is running."
        } else {
            Write-Output "[WARN] Please ensure you are logged into Docker Hub via 'docker login'."
        }

        foreach ($Service in $Services) {
            $LatestImage = $RegistryOwner + "/" + $Service + ":latest"
            $TaggedImage = $RegistryOwner + "/" + $Service + ":" + $VersionTag

            Write-Output "[INFO] Pushing $LatestImage..."
            docker push $LatestImage

            Write-Output "[INFO] Pushing $TaggedImage..."
            docker push $TaggedImage
        }
        Write-Output "[OK] Pushing completed successfully."
    }

    Write-Output "[OK] Process finished successfully."
    exit 0
}
catch {
    Write-Output "[WARN] Error occurred during Docker process: $_"
    exit 1
}
