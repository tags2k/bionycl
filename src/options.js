function render_example() {
    var config = get_options_object();
    var p = document.getElementById("example");
    p.innerText = 'Bionycl is a fully-customisable bionic reading extension for Chrome, and this is an example of a paragraph containing a few sentences, themselves harbouring words. Words will be styled thusly in the manner of your choosing.';

    window.bionycl(config, p, true);
}

function get_options_object() {
    var opts = {
        auto: document.getElementById('auto-speedread').checked,
        interval: Number.parseInt(document.getElementById(`interval`).value),
        commonwords: document.getElementById('commonwords').value,
        ignorecommon: document.getElementById('ignorecommon').checked,
        existingweightmultiplier: document.getElementById('existingweightmultiplier').value,
        defaultweight: document.getElementById('defaultweight').value,
        style: document.getElementById('style').value
    };

    for (var x = 1; x <= 10; x++) {
      opts[`letters${x}`] = Number.parseInt(document.getElementById(`letters${x}`).value);
    }

    for (var x = 1; x <= 10; x++) {
      opts[`parastyle${x}prop`] = document.getElementById(`parastyle${x}prop`).value;
      opts[`parastyle${x}value`] = document.getElementById(`parastyle${x}value`).value;
    }

    for (var x = 1; x <= 10; x++) {
      opts[`host${x}`] = document.getElementById(`host${x}`).value;
      opts[`host${x}selector`] = document.getElementById(`host${x}selector`).value;
      opts[`host${x}forceauto`] = document.getElementById(`host${x}forceauto`).checked;
      opts[`host${x}ignoreondemand`] = document.getElementById(`host${x}ignoreondemand`).checked;
      opts[`host${x}applyouter`] = document.getElementById(`host${x}applyouter`).checked;
    }

    return opts;
}

// Saves options to chrome.storage
function save_options(sender) {
  console.log(sender);
    chrome.storage.sync.set(get_options_object(), function() {
      var status = document.createElement("div");
      sender.target.parentNode.insertBefore(status, sender.target);
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get(window.bionyclDefaultConfig(), function(config) {
      document.getElementById('auto-speedread').checked = config.auto;
      document.getElementById('interval').value = config.interval;
      document.getElementById('style').value = config.style;
      document.getElementById('commonwords').value = config.commonwords;
      document.getElementById('ignorecommon').checked = config.ignorecommon;
      document.getElementById('existingweightmultiplier').value = config.existingweightmultiplier;
      document.getElementById('defaultweight').value = config.defaultweight;

      for (var x = 1; x <= 10; x++) {
        document.getElementById(`letters${x}`).value = config[`letters${x}`];
        document.getElementById(`letters${x}`).addEventListener("keyup", render_example);
        document.getElementById(`letters${x}`).addEventListener("change", render_example);
      }
  
      for (var x = 1; x <= 10; x++) {
        if (config[`parastyle${x}prop`]) document.getElementById(`parastyle${x}prop`).value = config[`parastyle${x}prop`];
        if (config[`parastyle${x}value`]) document.getElementById(`parastyle${x}value`).value = config[`parastyle${x}value`];

        document.getElementById(`parastyle${x}value`).addEventListener("keyup", render_example);
        document.getElementById(`parastyle${x}value`).addEventListener("change", render_example);
        document.getElementById(`parastyle${x}prop`).addEventListener("keyup", render_example);
        document.getElementById(`parastyle${x}prop`).addEventListener("change", render_example);
      }

      for (var x = 1; x <= 10; x++) {
        if (config[`host${x}`]) document.getElementById(`host${x}`).value = config[`host${x}`];
        if (config[`host${x}selector`]) document.getElementById(`host${x}selector`).value = config[`host${x}selector`];
        document.getElementById(`host${x}forceauto`).checked = config[`host${x}forceauto`];
        document.getElementById(`host${x}ignoreondemand`).checked = config[`host${x}ignoreondemand`];
        document.getElementById(`host${x}applyouter`).checked = config[`host${x}applyouter`];
      }

      document.getElementById('style').addEventListener("keyup", render_example);
      document.getElementById('style').addEventListener("change", render_example);
      document.getElementById('existingweightmultiplier').addEventListener("keyup", render_example);
      document.getElementById('existingweightmultiplier').addEventListener("change", render_example);
      document.getElementById('defaultweight').addEventListener("keyup", render_example);
      document.getElementById('defaultweight').addEventListener("change", render_example);

      render_example();
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  Array.from(document.querySelectorAll('.save')).forEach((el) => el.addEventListener('click', save_options));