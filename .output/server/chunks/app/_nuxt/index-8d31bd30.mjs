import { p as publicAssetsURL, b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-744fccd2.mjs';
import { useSSRContext, defineComponent, computed, ref, mergeProps, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import 'devalue';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'nodemailer';
import '@dword-design/functions/dist/find-index.js';
import '@dword-design/functions/dist/omit.js';
import 'http-graceful-shutdown';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const _imports_0$3 = "" + publicAssetsURL("svg/penny-project-header.png");
const _imports_1$3 = "" + publicAssetsURL("svg/icons/menu-burger.svg");
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    computed(() => {
      return false;
    });
    const header = ref(null);
    const logoHeader = ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        ref_key: "header",
        ref: header
      }, _attrs))} data-v-e86a99de><div class="container" data-v-e86a99de>`);
      _push(ssrRenderComponent(_component_nuxt_link, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="logo"${ssrRenderAttr("src", _imports_0$3)} alt="Penny Project Logo" title="The Penny Project" style="${ssrRenderStyle({ "top": "50px", "width": "auto", "height": "6rem" })}" data-v-e86a99de${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "logo",
                ref_key: "logoHeader",
                ref: logoHeader,
                src: _imports_0$3,
                alt: "Penny Project Logo",
                title: "The Penny Project",
                style: { "top": "50px", "width": "auto", "height": "6rem" }
              }, null, 512)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="navigation" style="${ssrRenderStyle({ "top": "70px" })}" data-v-e86a99de><img class="menu"${ssrRenderAttr("src", _imports_1$3)} data-v-e86a99de></section></div></header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e86a99de"]]);
const _imports_0$2 = "" + publicAssetsURL("images/hero-graphic-desktop.webp");
const _imports_1$2 = "" + publicAssetsURL("images/hero-logo-mobile.png");
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><section class="hero desktop" data-v-8ddae1e6><div class="container" data-v-8ddae1e6><div class="group" data-v-8ddae1e6><h1 class="header" data-v-8ddae1e6>Little Gifts, Big Impact</h1><p class="subheader" data-v-8ddae1e6>Welcome to <em data-v-8ddae1e6>Penny Projects</em>, a community of people dedicated to seeing a little go a long way.</p><p class="subheader2" data-v-8ddae1e6>Our misson is both simple yet profound: we aim to nuture and inspire high school students from Riverside Secondary Highschool to become the driving</p><div class="buttons" data-v-8ddae1e6><button id="donate-button" data-v-8ddae1e6>Donate Now</button><button data-v-8ddae1e6>Our Newsletter</button></div></div><img${ssrRenderAttr("src", _imports_0$2)} data-v-8ddae1e6></div></section><section class="hero mobile" data-v-8ddae1e6><div class="icon" data-v-8ddae1e6><img${ssrRenderAttr("src", _imports_1$2)} data-v-8ddae1e6></div><h1 class="header" data-v-8ddae1e6>Little Gifts, Big Impact</h1><img class="image"${ssrRenderAttr("src", _imports_0$2)} data-v-8ddae1e6><p class="subheader" data-v-8ddae1e6>Welcome to <em data-v-8ddae1e6>Penny Projects</em>, a community of people dedicated to seeing a little go a long way.</p><p class="subheader2" data-v-8ddae1e6>Our misson simple yet profound: nuture and inspire high school students from Riverside Secondary Highschool</p><div class="buttons" data-v-8ddae1e6><button id="donate-button" data-v-8ddae1e6>Donate Now</button><button data-v-8ddae1e6>Our Newsletter</button></div></section><!--]-->`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/hero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-8ddae1e6"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "donationPicker",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "donation-picker" }, _attrs))} data-v-39798c3b><div class="main" data-v-39798c3b><div class="container highlighted" data-v-39798c3b><div class="dot" data-v-39798c3b><div class="inner-dot" data-v-39798c3b></div></div><h4 data-v-39798c3b>$10 Donation</h4></div><div class="container" data-v-39798c3b><div class="dot" data-v-39798c3b><div class="inner-dot" data-v-39798c3b></div></div><h4 data-v-39798c3b>$5 Donation</h4></div><div class="container" data-v-39798c3b><div class="dot" data-v-39798c3b><div class="inner-dot" data-v-39798c3b></div></div><h4 data-v-39798c3b>$1 Donation</h4></div><div class="container" data-v-39798c3b><div class="dot" data-v-39798c3b><div class="inner-dot" data-v-39798c3b></div></div><h4 data-v-39798c3b>Custom</h4></div></div><div class="secondary" data-v-39798c3b><div class="container highlighted" data-v-39798c3b><div class="dot" data-v-39798c3b><div class="inner-dot" data-v-39798c3b></div></div><h4 data-v-39798c3b>One Time</h4></div><div class="container" data-v-39798c3b><div class="dot" data-v-39798c3b><div class="inner-dot" data-v-39798c3b></div></div><h4 data-v-39798c3b>Monthly</h4></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/donationPicker.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-39798c3b"]]);
const _imports_0$1 = "" + publicAssetsURL("svg/icon_instagram.svg");
const _imports_1$1 = "" + publicAssetsURL("svg/icon_facebook.svg");
const _imports_2$1 = "" + publicAssetsURL("svg/icon_youtube.svg");
const _imports_7 = "" + publicAssetsURL("svg/penny-icons-bg.svg");
const _sfc_main$1 = {
  __name: "emailSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "email" }, _attrs))} data-v-77f318bb><h3 class="header" data-v-77f318bb>Join our online family!</h3><div id="mc_embed_signup" data-v-77f318bb><form action="https://pennyprojects.us9.list-manage.com/subscribe/post?u=d915e9e09cea505cc1a8b8d0e&amp;id=4c02ec613b&amp;f_id=00f814e1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="" data-v-77f318bb><div id="mc_embed_signup_scroll" data-v-77f318bb><div class="mc-field-group name" data-v-77f318bb><label for="mce-FNAME" data-v-77f318bb>First Name</label><input type="text" name="FNAME" class="text" id="mce-FNAME" value="" data-v-77f318bb></div><div class="mc-field-group email" data-v-77f318bb><label for="mce-EMAIL" data-v-77f318bb>Email Address</label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="" data-v-77f318bb><span id="mce-EMAIL-HELPERTEXT" class="helper_text" data-v-77f318bb></span></div><div id="mce-responses" class="clear foot" data-v-77f318bb><div class="response" id="mce-error-response" style="${ssrRenderStyle({ "display": "none" })}" data-v-77f318bb></div><div class="response" id="mce-success-response" style="${ssrRenderStyle({ "display": "none" })}" data-v-77f318bb></div></div><div style="${ssrRenderStyle({ "position": "absolute", "left": "-5000px" })}" aria-hidden="true" data-v-77f318bb> /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */ <input type="text" name="b_d915e9e09cea505cc1a8b8d0e_4c02ec613b" tabindex="-1" value="" data-v-77f318bb></div><div class="optionalParent" data-v-77f318bb><div class="clear foot" data-v-77f318bb><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe" data-v-77f318bb><p style="${ssrRenderStyle({ "margin": "0px auto" })}" data-v-77f318bb><a href="http://eepurl.com/iAeBfo" title="Mailchimp - email marketing made easy and fun" data-v-77f318bb><span style="${ssrRenderStyle({ "display": "inline-block", "background-color": "transparent", "border-radius": "4px" })}" data-v-77f318bb><img class="refferal_badge" src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" alt="Intuit Mailchimp" style="${ssrRenderStyle({ "width": "220px", "height": "40px", "display": "flex", "padding": "2px 0px", "justify-content": "center", "align-items": "center" })}" data-v-77f318bb></span></a></p></div></div></div></form></div><div class="socials" data-v-77f318bb><a href="https://www.instagram.com/pennyprojects/" target="_blank" data-v-77f318bb><img${ssrRenderAttr("src", _imports_0$1)} data-v-77f318bb></a><a href="https://www.facebook.com/pennyprojects" target="_blank" data-v-77f318bb><img${ssrRenderAttr("src", _imports_1$1)} data-v-77f318bb></a><a href="https://www.instagram.com/pennyprojects/" target="_blank" data-v-77f318bb><img${ssrRenderAttr("src", _imports_2$1)} data-v-77f318bb></a></div><img class="background"${ssrRenderAttr("src", _imports_7)} data-v-77f318bb></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/emailSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-77f318bb"]]);
const _imports_0 = "" + publicAssetsURL("images/mission-graphic-1.webp");
const _imports_1 = "" + publicAssetsURL("images/mission-graphic-2.webp");
const _imports_2 = "" + publicAssetsURL("images/mission-graphic-3.webp");
const _imports_3 = "" + publicAssetsURL("images/approach-1.webp");
const _imports_4 = "" + publicAssetsURL("images/donations-1.webp");
const _imports_5 = "" + publicAssetsURL("images/joel-headshot.jpg");
const _imports_6 = "" + publicAssetsURL("svg/icons/hearts.svg");
const _imports_8 = "" + buildAssetsURL("hearts.2fbe772e.svg");
const _imports_9 = "" + publicAssetsURL("images/school-banner.webp");
const _imports_10 = "" + publicAssetsURL("images/logo-round.png");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Header = __nuxt_component_0;
  const _component_Hero = __nuxt_component_1;
  const _component_DonationPicker = __nuxt_component_2;
  const _component_EmailSection = __nuxt_component_3;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Header, null, null, _parent));
  _push(ssrRenderComponent(_component_Hero, null, null, _parent));
  _push(`<section class="mission" style="${ssrRenderStyle({})}" data-v-572f440f><div class="container" data-v-572f440f><h2 data-v-572f440f>Our Mission</h2><div class="group" data-v-572f440f><div class="descriptor" data-v-572f440f><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-572f440f><h3 data-v-572f440f>Mentorship &amp; Guidance</h3><p data-v-572f440f>Our misson is to <em data-v-572f440f>nurture and inspire highschool students from Riverside Secondary School, empowering them through mentorship and guidance</em> to become proactive problem solvers and the drivinf force behind positive change in their community.</p></div><div class="descriptor" data-v-572f440f><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-572f440f><h3 data-v-572f440f>Equpping with the Right Tools &amp; Skills</h3><p data-v-572f440f>To foster personal growth and societal impact, we actively cultivate a spirit of compassion and innovation within each young change-maker by thoughtfully and strategically <em data-v-572f440f>equipping our students with the right skills, knowledge, and resources.</em></p></div><div class="descriptor" data-v-572f440f><img${ssrRenderAttr("src", _imports_2)} alt="" data-v-572f440f><h3 data-v-572f440f>Community Empowerment</h3><p data-v-572f440f>We firmly believe in the transormative power of each individual to make a lasting difference, and our heartfelt goal is to see <em data-v-572f440f>these students flourish and add value to their community, creating a brighter tomorrow for all.</em></p></div></div></div></section><section class="approach desktop" data-v-572f440f><div class="container" data-v-572f440f><div class="group" data-v-572f440f><h2 data-v-572f440f>Our Approach</h2><p class="descriptor" data-v-572f440f>Through the help and support of the Riverside Secondary School we aim to provide a hands-on learning and experiential education. Our team of high school students are empowered to take the lead in every aspect of project development.</p><div class="approaches" data-v-572f440f><p data-v-572f440f>Identifying the needs of the community.</p><p data-v-572f440f>Devising effective solutions.</p><p data-v-572f440f>Executing the projects.</p></div><p class="descriptor-2" data-v-572f440f>This approach instills a sense of ownership and pride in the students. It also ensures that the projects are tailored to the specific requirements of our community.</p></div><div class="group" data-v-572f440f></div></div><img${ssrRenderAttr("src", _imports_3)} alt="" data-v-572f440f></section><section class="donation" data-v-572f440f><img${ssrRenderAttr("src", _imports_4)} alt="" data-v-572f440f><div class="container" data-v-572f440f><div class="group" data-v-572f440f></div><div class="group" data-v-572f440f><h3 data-v-572f440f>Together We Can</h3><p data-v-572f440f>To realise these transformative projects, we depend on generous donors who share our commitment. <em data-v-572f440f>Your contributions provide necessary resources for sucessful project implementation, making a lasting impact on lives and creating a ripple effect beyond borders.</em></p>`);
  _push(ssrRenderComponent(_component_DonationPicker, null, null, _parent));
  _push(`</div></div></section><section class="founder" data-v-572f440f><div class="round-container" data-v-572f440f><div class="profile" data-v-572f440f><img${ssrRenderAttr("src", _imports_5)} data-v-572f440f></div><img class="hearts"${ssrRenderAttr("src", _imports_6)} data-v-572f440f><h3 class="header" data-v-572f440f>Meet our Founder</h3><h4 class="subheader" data-v-572f440f>Joel Slade</h4><p class="text" data-v-572f440f> Joel Slade, an Australian Pastor, is driven by a <em data-v-572f440f>passion for empowering communities through education and service.</em> He has led development projects globally, spanning Ukraine, South and Central America, Asia, and the Pacific. Now, he&#39;s embarked on an incredible journey to Zambia, launching Penny Projects to create a lasting impact on high school students at Riverside Secondary School. <em class="underline" data-v-572f440f>Joel firmly believes in the power of relationships and community to drive transformative change, envisioning a future where Zambian students become proactive problem solvers and catalysts for positive change.</em></p></div><img class="background"${ssrRenderAttr("src", _imports_7)} data-v-572f440f></section><section class="join" data-v-572f440f><div class="container" data-v-572f440f><div class="header" data-v-572f440f><img${ssrRenderAttr("src", _imports_8)} alt="" data-v-572f440f><h3 data-v-572f440f>How you can join our family</h3></div><div class="content" data-v-572f440f><div class="item" data-v-572f440f><h4 data-v-572f440f>Volunteer</h4><p data-v-572f440f>Join us in the mission field and be part of our inspiring Penny Projects family. Together, let&#39;s create a brighter future for those we serve.</p><button data-v-572f440f>Volunteer</button></div><div class="item" data-v-572f440f><h4 data-v-572f440f>Donate</h4><p data-v-572f440f>Contribute a dollar or volunteer with us to build a compassionate community and achieve progress, one penny at a time.</p><button data-v-572f440f>Donate</button></div><div class="item" data-v-572f440f><h4 data-v-572f440f>Collaborate</h4><p data-v-572f440f>We want to work with you on Penny Projects in your own community. Partner with us to empower others and create lasting impact together.</p><button data-v-572f440f>Collaborate</button></div><div class="item" data-v-572f440f><h4 data-v-572f440f>Online Community</h4><p data-v-572f440f>Connect with like-minded individuals, follow us, and be a part of the Penny Projects family. Embrace optimisim and take action for positive change.</p><button data-v-572f440f>Join Us!</button></div></div></div></section><section class="banner" data-v-572f440f><img${ssrRenderAttr("src", _imports_9)} alt="" data-v-572f440f></section>`);
  _push(ssrRenderComponent(_component_EmailSection, null, null, _parent));
  _push(`<section class="banner2" data-v-572f440f><img${ssrRenderAttr("src", _imports_10)} alt="" data-v-572f440f></section><footer class="footer" data-v-572f440f><p class="number" data-v-572f440f>+1 828-808-4869</p><p class="email" data-v-572f440f>thepennyprojects@gmail.com</p><p class="address" data-v-572f440f>Kafue, Zambia</p></footer><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-572f440f"]]);

export { index as default };
//# sourceMappingURL=index-8d31bd30.mjs.map
