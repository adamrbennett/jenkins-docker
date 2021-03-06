FROM jenkins:latest

# allow inline css and javascript - this is potentially unsafe!
# try more restrictive policies for production, e.g.: default-src 'self';
ENV JAVA_OPTS "-Dhudson.model.DirectoryBrowserSupport.CSP="

# install the jenkins plugins
RUN /usr/local/bin/install-plugins.sh \
  ace-editor \
  ant \
  antisamy-markup-formatter \
  authentication-tokens \
  bouncycastle-api \
  branch-api build-timeout \
  cloudbees-folder \
  credentials \
  credentials-binding \
  display-url-api \
  docker-commons \
  docker-workflow \
  durable-task \
  email-ext \
  external-monitor-job \
  git \
  git-client \
  git-server \
  github \
  github-api \
  github-branch-source \
  github-organization-folder \
  gradle handlebars \
  icon-shim \
  jquery-detached \
  junit \
  ldap \
  mailer \
  mapdb-api \
  matrix-auth \
  matrix-project \
  momentjs \
  pam-auth \
  pipeline-build-step \
  pipeline-github-lib \
  pipeline-graph-analysis \
  pipeline-input-step \
  pipeline-milestone-step \
  pipeline-model-api \
  pipeline-model-definition \
  pipeline-model-extensions \
  pipeline-rest-api \
  pipeline-stage-step \
  pipeline-stage-tags-metadata \
  pipeline-stage-view \
  plain-credentials \
  resource-disposer \
  scm-api \
  script-security \
  ssh-credentials \
  ssh-slaves \
  structs \
  subversion \
  timestamper \
  token-macro \
  windows-slaves \
  workflow-aggregator \
  workflow-api \
  workflow-basic-steps \
  workflow-cps \
  workflow-cps-global-lib \
  workflow-durable-task-step \
  workflow-job \
  workflow-multibranch \
  workflow-scm-step \
  workflow-step-api \
  workflow-support \
  ws-cleanup \
  htmlpublisher \
  pipeline-npm \
  test-results-analyzer

COPY . /usr/share/jenkins/ref
