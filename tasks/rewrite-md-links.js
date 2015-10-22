'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('rewrite-md-links', function() {
  return gulp.src('./dist/api/**/*.html')

    // bitcore-node
    .pipe($.replace('"services.md"', '/api/service'))
    .pipe($.replace('"services/bitcoind.md"', '/api/service/bitcoin'))
    .pipe($.replace('"services/address.md"', '/api/service/address'))
    .pipe($.replace('"services/db.md"', '/api/service/db'))
    .pipe($.replace('"services/web.md"', '/api/service/web'))
    .pipe($.replace('"build.md"', '/api/build'))
    .pipe($.replace('"bus.md"', '/api/bus'))
    .pipe($.replace('"errors.md"', '/api/errors'))
    .pipe($.replace('"node.md"', '/api/node'))
    .pipe($.replace('"patch.md"', '/api/patch'))
    .pipe($.replace('"release.md"', '/api/release'))
    .pipe($.replace('"testing.md"', '/api/testing'))

    // bitcore-lib
    .pipe($.replace('"address.md"', '/api/lib/address'))
    .pipe($.replace('"block.md"', '/api/lib/block'))
    .pipe($.replace('"browser.md"', '/guides/browser'))
    .pipe($.replace('"crypto.md"', '/api/lib/crypto'))
    .pipe($.replace('"encoding.md"', '/api/lib/encoding'))
    .pipe($.replace('"examples.md"', '/api/'))
    .pipe($.replace('"hierarchical.md"', '/api/lib/hd-keys'))
    .pipe($.replace('"networks.md"', '/api/lib/networks'))
    .pipe($.replace('"privatekey.md"', '/api/lib/private-key'))
    .pipe($.replace('"publickey.md"', '/api/lib/public-key'))
    .pipe($.replace('"script.md"', '/api/lib/script'))
    .pipe($.replace('"transaction.md"', '/api/lib/transaction'))
    .pipe($.replace('"unit.md"', '/api/lib/unit'))
    .pipe($.replace('"unspentoutput.md"', '/api/lib/unspent-output'))
    .pipe($.replace('"uri.md"', '/api/lib/uri'))

    // bitcore-p2p
    .pipe($.replace('"messages.md"', '/api/p2p/messages'))
    .pipe($.replace('"peer.md"', '/api/p2p/peer'))
    .pipe($.replace('"pool.md"', '/api/p2p/pool'))

    // guides
    .pipe($.replace('"guide/fullnode.md"', '/api/guides/full-node'))


    .pipe(gulp.dest('dist/api'));
});
