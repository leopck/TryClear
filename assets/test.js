function get_focus() {
    $('#cursor').addClass('cursor');
}

function lost_focus() {
    $('#cursor').removeClass('cursor');
}
function refresh_clear_data()
{
    localStorage.clear();
}
function test_suggestion(flag,realkey,string_input,count)
{	
	$("html").delegate("code.input", "mousedown", function(a) {
		commands = $("code.input:first").text();
		string_input += commands;
		realkey += commands;
		document.getElementById("show-input").innerHTML = realkey;
		count += commands.length;
	});
    $("#editor-container").scrollTop(document.getElementById("show-input").offsetHeight);
    $("#editor-group").keydown(function(e){


        if(e.which == 32 ) {
            realkey += " ";
            string_input += " ";
            document.getElementById("show-input").innerHTML = realkey;
            count ++;
        }
        if(e.which == 8 && count > 0){
            if(realkey.substr(realkey.length-2,2) != '> ')
            {
                realkey = realkey.substr(0,realkey.length-1);
                string_input = string_input.substr(0,string_input.length-1);
            }

            document.getElementById("show-input").innerHTML = realkey;
            count --;
        }

        var ruler = $("#ruler");
        if(realkey.match(/>/g).length > 2){
            var data = realkey.split(">")
            console.log(data[data.length-1].length)

            var left = (data[data.length-1].length*8 + parseInt(data[data.length-1].length/2)*0.9)%$("#show-input").width()  + 12;
        }else{

            var data = realkey.split("&gt;")

            var left = (data[data.length-1].length*8 + parseInt(data[data.length-1].length/2)*0.9)%$("#show-input").width()  + 12;

        }


        $("#cursor")[0].style.marginLeft = left+"px";

    });
    $("#editor-group").keypress(function(e){

        if(e.which == 189)
        {
            realkey += "-";
            string_input += "-";
            document.getElementById("show-input").innerHTML = realkey;
            count ++;
        }
        else if(e.which == 39)
        {
            realkey += "'";
            string_input += "'";
            document.getElementById("show-input").innerHTML = realkey;
            count ++;
        }
        else if(e.which == 222)
        {
            realkey += "\"";
            string_input += "\"";
            document.getElementById("show-input").innerHTML = realkey;
            count ++;
        }
        else if(e.which == 190)
        {
            realkey += ".";
            string_input += ".";
            document.getElementById("show-input").innerHTML = realkey;
            count ++;
        }
        else if(e.which <= 40 && e.which >= 37)
        {
            realkey = realkey;
            document.getElementById("show-input").innerHTML = realkey;
            count ++;
        }
        else if (e.which == 13 )
        {
            if(output_info_datas[flag][string_input] == undefined)
            {
                realkey += "\nzsh:command not found:"+string_input;
            }
            else{
                realkey += output_info_datas[flag][string_input];
            }
            realkey = realkey + '\n' + '> ';
            document.getElementById("show-input").innerHTML = realkey;
            $("#editor-container").scrollTop(document.getElementById("show-input").offsetHeight);
            localStorage.setItem("show_inputs_string",JSON.stringify(realkey));

            if(array_correct_inputs[flag-1] == string_input)
            {
                if(flag<25) {
					//window.location.href = flag+1+".html";
					var url = window.location.href;
					var re = /page=\d$/
					if (re.test(url)){
						page_num = url.split('=')[1];
						new_num = parseInt(page_num) + 1;
						var old_page = 'page=' + page_num;
						var new_page = 'page=' + new_num;
						flag = new_num;
						var newUrl = url.replace(old_page, new_page);
						history.pushState(null, null, newUrl);
						string_input = "";
						course_app_init(new_num);
					}
				}
            }
            count = 0;
            string_input = "";
        }
        else
        {
            realkey += String.fromCharCode(e.which);
            string_input += String.fromCharCode(e.which);
            document.getElementById("show-input").innerHTML = realkey;
            count ++;
        }
        localStorage.setItem("show_inputs_string",JSON.stringify(realkey));
        var ruler = $("#ruler");
        if(realkey.match(/>/g).length > 2){
            var data = realkey.split(">")
            console.log(data[data.length-1].length)
            var left = (data[data.length-1].length*8 + parseInt(data[data.length-1].length/2)*0.9)%$("#show-input").width()  + 12;
        }else{

            var data = realkey.split("&gt;")
            ruler[0].innerHTML = ">" + data[data.length-1]
            var left = (data[data.length-1].length*8 + parseInt(data[data.length-1].length/2)*0.9)%$("#show-input").width()  + 12;
        }
        $("#cursor")[0].style.marginLeft = left+"px";


    });
    $("#editor-group").focus();
}

function course_app_init(flag) {
            CourseApp.init({
                lab: {
                    "created_at": "2012-06-26T17:00:02Z",
                    "free_play": false,
                    "id": 1,
                    "name": "Level 1",
                    "number": 1,
                    "updated_at": "2012-06-26T17:00:02Z",
                    "video_id": null,
                    "video_mov_file": null,
                    "video_mp4_file": null
                },
                //展示锟斤拷锟斤拷Advice
                tabs: [{
                    "anchor": "Terms",
                    "id": "terms",
                    "panel_id": "terms",
                    "render": {
                        "html": description_info[flag].advice
                    }
                }],
                hints: {
                    "hints": [],
                    "has_more_hints": false,
                    "url": "https://try.github.io/levels/1/challenges/1/next_hint.json",
                    "hints_remaining": 0,
                    "hints_text": "Hints",
                    "hint_cost": 0
                },
                editors: [{
                    "url": "http://localhost:63342/TryGit/index_init.html",
                    "instructions": "<p>Git allows groups of people to work on the same documents (often code) at\nthe same time, and without stepping on each other's toes. It's a distributed\nversion control system.</p>\n\n\n\n\n<p>Our terminal prompt below is currently in a directory we decided to name \"octobox\".\nTo initialize a Git repository here, type the following command:</p>\n\n\n\n\n<p><code class=\"input\">git init</code></p>",
                    "initial_value": "",
                    "type": "console",
                    "anchor": "Console",
                    "id": 1,
                    "syntax": "ruby",
                    "snippet": "",
                    "change_event": null,
                    "focused": true,
                    "experiment_until_correct": null,
                    "prompt": "$ ",
                    "result_prompt": "",
                    "noisy_success": false,
                    "welcome_message": "Press enter to submit commands"
                }],
                current_user: {
                    "points": 500
                },
                //展示锟斤拷目锟皆硷拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
                challenge: {
                    "id": flag,
                    "title": description_info[flag].title,
                    "number": flag,
                    "completed": true,
                    "url": "index_init.html",
                    "path": null,
                    "experiment": false,
                    "possible_points": 250,
                    "switch_labs_url": "https://try.github.io/levels/switch?current_exercise_id=1",
                    "level_number": 1,
                    "total_challenges": 25,
                    "instructions": description_info[flag].instructions,
                    "file_browser": description_info[flag].file_browser,
                    "extra_credit_instructions": {},
                    "keep_score": true,
                    "all_experiment": null,
                    "reload": null,
                    "splitter": "#########################"
                },
                challenges: [{
                    "id": 1,
                    "title": "Got 15 minutes and want to learn Git?",
                    "number": 1,
                    "instructions": "<p>Git allows groups of people to work on the same documents (often code) at\nthe same time, and without stepping on each other's toes. It's a distributed\nversion control system.</p>\n\n\n\n\n<p>Our terminal prompt below is currently in a directory we decided to name \"octobox\".\nTo initialize a Git repository here, type the following command:</p>\n\n\n\n\n<p><code class=\"input\">git init</code></p>",
                    "completed": true,
                    "current": true,
                    "url": "https://try.github.io/levels/1/challenges/1"
                }, {
                    "id": 2,
                    "title": "Checking the Status",
                    "number": 2,
                    "instructions": "<p>Good job! As Git just told us, our \"octobox\" directory now has an empty repository in <code>/.git/</code>.\nThe repository is a hidden directory where Git operates.</p>\n\n\n\n\n<p>To save your progress as you go through this tutorial\n-- and earn a badge when you successfully complete it -- head over\nto <a href=\"https://www.codeschool.com/account/courses/try-git/add\">create a free Code School account</a>. We'll wait for you here.</p>\n\n\n\n\n<p>Next up, let's type the <code>git status</code> command to see what the current\nstate of our project is:</p>\n\n\n\n\n<p><code class=\"input\">git status</code></p>",
                    "completed": true,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/2"
                }, {
                    "id": 3,
                    "title": "Adding & Committing",
                    "number": 3,
                    "instructions": "<p>I created a file called <code>octocat.txt</code> in the octobox repository for you\n(as you can see in the browser below).</p>\n\n\n\n\n<p>You should run the <code>git status</code> command again to\nsee how the repository status has changed:</p>\n\n\n\n\n<p><code class=\"input\">git status</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/3"
                }, {
                    "id": 4,
                    "title": "Adding Changes",
                    "number": 4,
                    "instructions": "<p>Good, it looks like our Git repository is working properly. Notice how\nGit says <code>octocat.txt</code> is \"untracked\"? That means Git sees that <code>octocat.txt</code>\nis a new file.</p>\n\n\n\n\n<p>To tell Git to start tracking changes made to <code>octocat.txt</code>, we first need to add it\nto the staging area by using <code>git add</code>.</p>\n\n\n\n\n<p><code class=\"input\">git add octocat.txt</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/4"
                }, {
                    "id": 5,
                    "title": "Checking for Changes",
                    "number": 5,
                    "instructions": "<p>Good job! Git is now tracking our <code>octocat.txt</code> file. Let's run\n<code>git status</code> again to see where we stand:</p>\n\n\n\n\n<p><code class=\"input\">git status</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/5"
                }, {
                    "id": 6,
                    "title": "Committing",
                    "number": 6,
                    "instructions": "<p>Notice how Git says <code>changes to be committed</code>? The files listed here are in the <code>Staging Area</code>, and\nthey are not in our repository yet.  We could add or remove files from the stage before we store them in the repository.</p>\n\n\n\n\n<p>To store our staged changes we run the <code>commit</code> command with a message describing what we've\nchanged. Let's do that now by typing:</p>\n\n\n\n\n<p><code class=\"input\">git commit -m \"Add cute octocat story\"</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/6"
                }, {
                    "id": 7,
                    "title": "Adding All Changes",
                    "number": 7,
                    "instructions": "<p>Great! You also can use wildcards if you want to add many files of the\nsame type. Notice that I've added a bunch of .txt files into your\ndirectory below.</p>\n\n\n\n\n<p>I put some in a directory named \"octofamily\" and some others ended up in the root of our \"octobox\" directory.\nLuckily, we can add all the new files using a wildcard with <code>git add</code>. Don't forget the quotes!</p>\n\n\n\n\n<p><code class=\"input\">git add '*.txt'</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/7"
                }, {
                    "id": 8,
                    "title": "Committing All Changes",
                    "number": 8,
                    "instructions": "<p>Okay, you've added all the text files to the staging area. Feel\nfree to run git status to see what you're about to commit.</p>\n\n\n\n\n<p>If it looks good, go ahead and run:</p>\n\n\n\n\n<p><code class=\"input\">git commit -m 'Add all the octocat txt files'</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/8"
                }, {
                    "id": 9,
                    "title": "History",
                    "number": 9,
                    "instructions": "<p>So we've made a few commits. Now let's browse them to see what\nwe changed.</p>\n\n\n\n\n<p>Fortunately for us, there's <code>git log</code>. Think of Git's log as\na journal that remembers all the changes we've committed so far, in the\norder we committed them. Try running it now:</p>\n\n\n\n\n<p><code class=\"input\">git log</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/9"
                }, {
                    "id": 10,
                    "title": "Remote Repositories",
                    "number": 10,
                    "instructions": "<p>Great job! We've gone ahead and created a new empty GitHub repository for you\nto use with Try Git at <code>https://github.com/try-git/try_git.git</code>.\nTo push our local <i>repo</i> to the GitHub server we'll need to add a remote repository.</p>\n\n\n\n\n<p>This command takes a <i>remote name</i> and a <i>repository URL</i>,\nwhich in your case is <code>https://github.com/try-git/try_git.git</code>.</p>\n\n\n\n\n<p>Go ahead and run <code>git remote add</code> with the options below:</p>\n\n\n\n\n<p><code class=\"input\">git remote add origin https://github.com/try-git/try_git.git</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/10"
                }, {
                    "id": 11,
                    "title": "Pushing Remotely",
                    "number": 11,
                    "instructions": "<p>The push command tells Git where to put our commits when we're ready, and boy we're ready.\nSo let's push our local changes to our <strong>origin</strong> repo (on GitHub).</p>\n\n\n\n\n<p>The name of our remote is <code>origin</code> and the default local branch name is <code>master</code>. The <code>-u</code> tells Git to remember the parameters,\nso that next time we can simply run <code>git push</code> and Git will know what to do. Go ahead and push it!</p>\n\n\n\n\n<p><code class=\"input\">git push -u origin master</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/11"
                }, {
                    "id": 12,
                    "title": "Pulling Remotely",
                    "number": 12,
                    "instructions": "<p>Let's pretend some time has passed. We've invited other people to our github project who have\npulled your changes, made their own commits, and pushed them.</p>\n\n\n\n\n<p>We can check for changes on our GitHub\nrepository and pull down any new changes by running:</p>\n\n\n\n\n<p><code class=\"input\">git pull origin master</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/12"
                }, {
                    "id": 13,
                    "title": "Differences",
                    "number": 13,
                    "instructions": "<p>Uh oh, looks like there have been some additions and changes to the octocat family.\nLet's take a look at what is <code>different</code> from our last commit by using the <code>git diff</code> command.</p>\n\n\n\n\n<p>In this case we want the diff of our most recent commit, which we can refer to\nusing the <code>HEAD</code> pointer.</p>\n\n\n\n\n<p><code class=\"input\">git diff HEAD</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/13"
                }, {
                    "id": 14,
                    "title": "Staged Differences",
                    "number": 14,
                    "instructions": "<p>Another great use for <code>diff</code> is looking at changes within files that\nhave already been staged. Remember, staged files are files we have told\ngit that are ready to be committed.</p>\n\n\n\n\n<p>Let's use <code>git add</code> to stage <code>octofamily/octodog.txt</code>, which I just added to the family for you.</p>\n\n\n\n\n<p><code class=\"input\">git add octofamily/octodog.txt</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/14"
                }, {
                    "id": 15,
                    "title": "Staged Differences (cont'd)",
                    "number": 15,
                    "instructions": "<p>Good, now go ahead and run <code>git diff</code> with the <code>--staged</code> option\nto see the changes you just staged.  You should see that <code>octodog.txt</code>\nwas created.</p>\n\n\n\n\n<p><code class=\"input\">git diff --staged</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/15"
                }, {
                    "id": 16,
                    "title": "Resetting the Stage",
                    "number": 16,
                    "instructions": "<p>So now that octodog is part of the family, octocat is all depressed.\nSince we love octocat more than octodog, we'll turn his frown around by removing <code>octodog.txt</code>.</p>\n\n\n\n\n<p>You can unstage files by using the <code>git reset</code>\ncommand. Go ahead and remove <code>octofamily/octodog.txt</code>.</p>\n\n\n\n\n<p><code class=\"input\">git reset octofamily/octodog.txt</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/16"
                }, {
                    "id": 17,
                    "title": "Undo",
                    "number": 17,
                    "instructions": "<p><code>git reset</code> did a great job of unstaging octodog.txt, but you'll\nnotice that he's still there. He's just not staged anymore. It would be great\nif we could go back to how things were before octodog came around and ruined the party.</p>\n\n\n\n\n<p>Files can be changed back to how they were at the last commit by using the\ncommand: <code>git checkout -- &lt;target&gt;</code>. Go ahead and\nget rid of all the changes since the last commit for <code>octocat.txt</code></p>\n\n\n\n\n<p><code class=\"input\">git checkout -- octocat.txt</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/17"
                }, {
                    "id": 18,
                    "title": "Branching Out",
                    "number": 18,
                    "instructions": "<p>When developers are working on a feature or bug they'll often create a copy (aka. <code>branch</code>) of their code\nthey can make separate commits to.  Then when they're done they can merge this branch back into\ntheir main <code>master</code> branch.</p>\n\n\n\n\n<p>We want to remove all these pesky octocats, so let's create a branch called <code>clean_up</code>,\nwhere we'll do all the work:</p>\n\n\n\n\n<p><code class=\"input\">git branch clean_up</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/18"
                }, {
                    "id": 19,
                    "title": "Switching Branches",
                    "number": 19,
                    "instructions": "<p>Great! Now if you type <code>git branch</code> you'll see two local branches: a main branch named <code>master</code>\nand your new branch named <code>clean_up</code>.</p>\n\n\n\n\n<p>You can switch branches using the <code>git checkout &lt;branch&gt;</code>\ncommand. Try it now to switch to the <code>clean_up</code> branch:</p>\n\n\n\n\n<p><code class=\"input\">git checkout clean_up</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/19"
                }, {
                    "id": 20,
                    "title": "Removing All The Things",
                    "number": 20,
                    "instructions": "<p>Ok, so you're in the <code>clean_up</code> branch. You can finally remove\nall those pesky octocats by using the <code>git rm</code> command\nwhich will not only remove the actual files from disk, but will\nalso stage the removal of the files for us.</p>\n\n\n\n\n<p>You're going to want to use a wildcard again to get all the octocats in one\nsweep, go ahead and run:</p>\n\n\n\n\n<p><code class=\"input\">git rm '*.txt'</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/20"
                }, {
                    "id": 21,
                    "title": "Commiting Branch Changes",
                    "number": 21,
                    "instructions": "<p>Now that you've removed all the cats you'll need to commit your changes.</p>\n\n\n\n\n<p>Feel free to run <code>git status</code> to check the changes you're about to commit.</p>\n\n\n\n\n<p><code class=\"input\">git commit -m \"Remove all the cats\"</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/21"
                }, {
                    "id": 22,
                    "title": "Switching Back to master",
                    "number": 22,
                    "instructions": "<p>Great, you're almost finished with the cat... er the bug fix, you just need\nto switch back to the <code>master</code> branch so you can copy (or <code>merge</code>) your changes from the\n<code>clean_up</code> branch back into the <code>master</code> branch.</p>\n\n\n\n\n<p>Go ahead and checkout the <code>master</code> branch:</p>\n\n\n\n\n<p><code class=\"input\">git checkout master</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/22"
                }, {
                    "id": 23,
                    "title": "Preparing to Merge",
                    "number": 23,
                    "instructions": "<p>Alrighty, the moment has come when you have to merge your changes from the\n<code>clean_up</code> branch into the <code>master</code> branch. Take a deep breath, it's\nnot that scary.</p>\n\n\n\n\n<p>We're already on the <code>master</code> branch, so we just need to tell Git to\nmerge the <code>clean_up</code> branch into it:</p>\n\n\n\n\n<p><code class=\"input\">git merge clean_up</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/23"
                }, {
                    "id": 24,
                    "title": "Keeping Things Clean",
                    "number": 24,
                    "instructions": "<p>Congratulations! You just accomplished your first successful bugfix and merge.\nAll that's left to do is clean up after yourself. Since you're done with\nthe <code>clean_up</code> branch you don't need it anymore.</p>\n\n\n\n\n<p>You can use <code>git branch -d &lt;branch name&gt;</code> to delete a branch. Go ahead\nand delete the <code>clean_up</code> branch now:</p>\n\n\n\n\n<p><code class=\"input\">git branch -d clean_up</code></p>",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/24"
                }, {
                    "id": 25,
                    "title": "The Final Push",
                    "number": 25,
                    "instructions": "<p>Here we are, at the last step. I'm proud that you've made it this far,\nand it's been great learning Git with you. All that's left for you to\ndo now is to push everything you've been working on to your\nremote repository,\nand you're done!</p>\n\n<p><code class=\"input\">git push</code></p>\n",
                    "completed": false,
                    "current": false,
                    "url": "https://try.github.io/levels/1/challenges/25"
                }],
                file_browser: {
                    "files": [""],
                    "name": "File Browser"
                }
            });
}