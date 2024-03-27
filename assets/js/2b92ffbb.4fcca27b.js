"use strict";(self.webpackChunkcthunline_doc=self.webpackChunkcthunline_doc||[]).push([[286],{997:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var t=o(74848),r=o(28453);const s={},i="Docker deployment",a={id:"documentation/deployment/deploy-docker",title:"Docker deployment",description:"Cthunline can be easily deployed using Docker images.",source:"@site/docs/documentation/deployment/deploy-docker.md",sourceDirName:"documentation/deployment",slug:"/documentation/deployment/deploy-docker",permalink:"/docs/documentation/deployment/deploy-docker",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Introduction",permalink:"/docs/documentation/introduction"},next:{title:"Reverse proxy",permalink:"/docs/documentation/deployment/deploy-proxy"}},d={},c=[{value:"docker-compose.yml",id:"docker-composeyml",level:2},{value:".env",id:"env",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"docker-deployment",children:"Docker deployment"}),"\n",(0,t.jsx)(n.p,{children:"Cthunline can be easily deployed using Docker images."}),"\n",(0,t.jsxs)(n.p,{children:["You will find below an example of ",(0,t.jsx)(n.code,{children:"docker-compose.yaml"})," file and its ",(0,t.jsx)(n.code,{children:".env"})," companion."]}),"\n",(0,t.jsxs)(n.p,{children:["Edit configuration as you wish then use ",(0,t.jsx)(n.code,{children:"docker compose up -d"})," (or ",(0,t.jsx)(n.code,{children:"docker-compose up -d"})," for older versions) to run the container."]}),"\n",(0,t.jsx)(n.h2,{id:"docker-composeyml",children:"docker-compose.yml"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"version: '3'\n\nservices:\n    cthunline:\n        image: cthunline/cthunline\n        container_name: cthunline\n        restart: always\n        env_file:\n            - .env\n        volumes:\n            - cthunline_assets:/data/assets\n            - cthunline_logs:/data/logs\n        networks:\n            - cthunline-network\n        ports:\n            - 8080:8080\n            # if your container is served by a reverse proxy then bind to localhost only\n            # - 127.0.0.1:8080:8080\n    postgresql:\n        image: postgres\n        container_name: postgresql\n        restart: always\n        networks:\n            - cthunline-network\n        environment:\n            POSTGRES_USER: username\n            POSTGRES_PASSWORD: password\n    keydb:\n        image: eqalpha/keydb\n        container_name: keydb\n        restart: always\n        networks:\n            - cthunline-network\n\nvolumes:\n    cthunline_assets:\n    cthunline_logs:\n\nnetworks:\n    cthunline-network:\n        name: cthunline\n"})}),"\n",(0,t.jsx)(n.h2,{id:"env",children:".env"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"#\n# App\n#\n# Credentials for the default user\nDEFAULT_ADMIN_NAME=admin\nDEFAULT_ADMIN_EMAIL=admin@admin.com\nDEFAULT_ADMIN_PASSWORD=cthunline\n# If registration is enabled\nREGISTRATION_ENABLED=true\n# (optional) If registering must require an invitation code\nINVITATION_ENABLED=true\n# Default theme (dark or light)\nDEFAULT_THEME=dark\n# Default language\nDEFAULT_LOCALE=en\n#\n# Server\n#\n# Environment (prod or dev)\n# If prod, client build will be served by the server\n# If dev, backend server and front client are run separately\nENVIRONMENT=prod\n# Server port\nPORT=8080\n# JWT secret\nJWT_SECRET=abcdef1234567890abcdef1234567890\n# Secret used to encrypt data\nCRYPTO_SECRET=abcdef1234567890abcdef1234567890\n# Cookie signing secret\nCOOKIE_SECRET=abcdef123456789abcdef123456789\n# If cookies must be secured (HTTPS only)\nCOOKIE_SECURE=true\n# If logs are enabled\nLOG_ENABLED=true\n# (optional) Directory in which logs are stored\n# If omitted logs will only appear in console\nLOG_DIR=/var/log/cthunline\n# If server is behind a revese proxy\nREVERSE_PROXY=true\n# Rate limiter options (protects login and registration endpoints)\n# Window duration in minutes\nRL_WINDOW_DURATION=10\n# Maximum number of requests per window\nRL_MAX_REQUESTS=100\n#\n# Database\n#\n# (optional) Disable Prisma telemetry\n# It's very much recommanded as we don't like telemetry bullshit in here\nCHECKPOINT_DISABLE=1\n# PostgreSQL connection URL\nDATABASE_URL=postgresql://username:password@postgresql:5432/database\n##\n## Cache (KeyDB is recommanded but Redis should also work)\n##\n# KeyDB/Redis server host\nCACHE_HOST=keydb\n# KeyDB/Redis server port\nCACHE_PORT=6379\n# KeyDB/Redis database name (integer)\nCACHE_DATABASE=0\n# KeyDB/Redis password (optional)\n#CACHE_PASSWORD=abc123\n#\n# Assets\n#\n# Directory in which assets are uploaded (images and audio)\nASSET_DIR=/path/to/assets\n# Maximum upload size in Mb (total)\nASSET_MAX_SIZE_MB=100\n# Maximum upload size per file in Mb\nASSET_MAX_SIZE_MB_PER_FILE=20\n# Maximum character portrait size in Mb\nPORTRAIT_MAX_SIZE_MB=2\n"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},28453:(e,n,o)=>{o.d(n,{R:()=>i,x:()=>a});var t=o(96540);const r={},s=t.createContext(r);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);