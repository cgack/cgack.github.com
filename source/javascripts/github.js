var github = (function(){
<<<<<<< HEAD
  function render(target, repos){
    var i = 0, fragment = '', t = $(target);

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+repos[i].description+'</p></li>';
    }
    t.children().remove();
    t.append(fragment);
=======
  function escapeHtml(str) {
    return $('<div/>').text(str).html();
  }
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+escapeHtml(repos[i].description||'')+'</p></li>';
    }
    t.innerHTML = fragment;
>>>>>>> 078c2a32134a4fe409884612ddc8e5b62c435a9e
  }
  return {
    showRepos: function(options){
      $.ajax({
<<<<<<< HEAD
          url: "https://api.github.com/users/"+options.user+"/repos?callback=?"
=======
          url: "https://api.github.com/users/"+options.user+"/repos?sort=pushed&callback=?"
>>>>>>> 078c2a32134a4fe409884612ddc8e5b62c435a9e
        , type: 'jsonp'
        , error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(data) {
          var repos = [];
<<<<<<< HEAD
          var _data = data.data;
          if (!_data) { return; }
          for (var i = 0; i < _data.length; i++) {
            if (options.skip_forks && _data[i].fork) { continue; }
            repos.push(_data[i]);
          }
          repos.sort(function(a, b) {
            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

=======
          if (!data || !data.data) { return; }
          for (var i = 0; i < data.data.length; i++) {
            if (options.skip_forks && data.data[i].fork) { continue; }
            repos.push(data.data[i]);
          }
>>>>>>> 078c2a32134a4fe409884612ddc8e5b62c435a9e
          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        }
      });
    }
  };
<<<<<<< HEAD
})();
=======
})();
>>>>>>> 078c2a32134a4fe409884612ddc8e5b62c435a9e
