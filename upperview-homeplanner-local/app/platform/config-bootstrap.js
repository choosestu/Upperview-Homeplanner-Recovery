// Reusable bootstrap adapter: applies project configuration to the recovered legacy shell.
(function (global, document) {
  function applyStageConfig() {
    var config = global.HomePlannerConfig;
    var stage = document.getElementById("my-stage");
    if (!config || !stage) return;

    stage.setAttribute("data-client", config.builder.key);
    stage.setAttribute("data-tid", config.builder.analyticsId || "");
    stage.setAttribute("data-fbappid", config.builder.facebookAppId || "");
    stage.setAttribute("data-tgtNbrhood", config.project.targetNeighborhood || config.project.name);
  }

  applyStageConfig();
}(window, document));
