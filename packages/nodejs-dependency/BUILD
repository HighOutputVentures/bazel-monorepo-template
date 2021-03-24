package(default_visibility = ["//visibility:public"])

load("@npm//@bazel/typescript:index.bzl", "ts_project")

ts_project(
    name = "compile",
    srcs = glob(
        ["**/*.ts"],
        exclude = [
            "node_modules/**/*.*",
            "tests/**",
        ],
    ),
    source_map = True,
    declaration = True,
    tsconfig = "tsconfig.json",
    extends = "//:tsconfig.json",
    deps = [
        "@npm//base32.js",
        "@npm//@types/node",
    ],
)

load("@build_bazel_rules_nodejs//:index.bzl", "js_library")

js_library(
    name = "package",
    package_name = "@bazel-monorepo-template/nodejs-dependency",
    srcs = ["package.json"],
    deps = [":compile"],
)
